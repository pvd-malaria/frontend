#!/bin/bash
rm -rf dist
mkdir dist

for h in Visualizacoes/*/*.html; do
	npx parcel build "$h"
done
