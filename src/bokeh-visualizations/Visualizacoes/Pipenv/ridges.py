import colorcet as cc
from numpy import linspace
from scipy.stats.kde import gaussian_kde

from bokeh.models import ColumnDataSource, FixedTicker, PrintfTickFormatter
from bokeh.plotting import figure, output_file, save


import pandas as pd
import json


def ridge(category, data, scale=18):
    return list(zip([category]*len(data), scale*data))

df = pd.read_json('proportions.json')


cats = ['AC', 'AM', 'AP', 'MA', 'MT', 'PA', 'RO', 'RR', 'TO']



with open('proportions.json', 'r') as f:
    df = json.load(f)

prop_por_estado = {}

for obj in df:
    estado = obj['uf']
    prop = obj['prop_positive_total']
    
    if estado in prop_por_estado:
        prop_por_estado[estado].append(prop)

    else:
        prop_por_estado[estado] = [prop]


palette = ['#3d008d','#76009d','#890096','#aa1b8b','#cb4d71','#db6163','#de6760','#f4984d','#f6db4e']

x = linspace(-20,110, 500)

source = ColumnDataSource(data=dict(x=x))

p = figure(y_range=cats, width=700, height=900, x_range=(-5, 35), toolbar_location=None)

for i, cat in enumerate(reversed(cats)):

    pdf = gaussian_kde(prop_por_estado[cat])
    
    y = ridge(cat, pdf(x))
    source.add(y, cat)
    p.patch('x', cat, color=palette[i], alpha=0.9, line_color="black", source=source)

p.outline_line_color = "#000000"
p.background_fill_color = "#efefef"

p.xaxis.ticker = FixedTicker(ticks=list(range(0, 31, 10)))
p.xaxis.formatter = PrintfTickFormatter(format="%d")

# p.yaxis.ticker = FixedTicker(ticks=list(range(len(cats))))
# p.yaxis.major_label_overrides = dict(zip(range(len(cats)), cats))

p.ygrid.grid_line_color = "#efefef"
p.xgrid.grid_line_color = "#dddddd"
p.xgrid.ticker = p.xaxis.ticker

p.axis.minor_tick_line_color = "#000000"
p.axis.major_tick_line_color = "#000000"
p.axis.axis_line_color = "#000000"

p.y_range.range_padding = 0.12


output_file('ridges.html')

save(p)

