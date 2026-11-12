#!/usr/bin/env python3
"""Remove trechos de uma narração (erros de fala) e ajusta os tempos das palavras.

Uso: python3 ferramentas/aplicar_cortes.py audio.wav palavras.json saida.wav saida.json INICIO-FIM [INICIO-FIM ...]
Exemplo: ... 7.02-7.76   (remove o que foi dito entre 7,02 s e 7,76 s)
"""
import json
import subprocess
import sys

audio, palavras_json, saida_audio, saida_json, *faixas = sys.argv[1:]
cortes = sorted(tuple(float(x) for x in f.split("-")) for f in faixas)

# Áudio: mantém tudo que está fora dos cortes, com uma emenda suave de 15 ms.
partes, cursor = [], 0.0
for ini, fim in cortes:
    partes.append((cursor, ini))
    cursor = fim
partes.append((cursor, None))
filtros = []
for i, (a, b) in enumerate(partes):
    fim = f":end={b}" if b is not None else ""
    filtros.append(f"[0:a]atrim=start={a}{fim},asetpts=PTS-STARTPTS[p{i}]")
anterior = "p0"
for i in range(1, len(partes)):
    filtros.append(f"[{anterior}][p{i}]acrossfade=d=0.015:c1=tri:c2=tri[m{i}]")
    anterior = f"m{i}"
subprocess.run(
    ["ffmpeg", "-v", "error", "-y", "-i", audio, "-filter_complex", ";".join(filtros),
     "-map", f"[{anterior}]", "-c:a", "pcm_s16le", saida_audio],
    check=True,
)

# Palavras: descarta as que caem dentro de um corte e adianta as seguintes.
resultado = []
for p in json.load(open(palavras_json, encoding="utf-8")):
    meio = (p["inicio"] + p["fim"]) / 2
    if any(ini <= meio <= fim for ini, fim in cortes):
        continue
    recuo = sum(fim - ini for ini, fim in cortes if fim <= meio)
    resultado.append({**p, "inicio": round(p["inicio"] - recuo, 3), "fim": round(p["fim"] - recuo, 3)})
json.dump(resultado, open(saida_json, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(" ".join(p["texto"] for p in resultado))
