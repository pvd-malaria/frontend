library(tidyverse)
library(htmlwidgets)
library(plotly)

viz2 <- readxl::read_excel('txpositivo.xlsx') %>% 
  janitor::clean_names()

summary(viz2)

library(ggplot2)
library(ggridges)
names(viz2)

v <- ggplot(viz2, aes(x = propositivo, y = uf, fill = stat(x))) +
  geom_density_ridges_gradient(scale = 3, rel_min_height = 0.01) +
  scale_fill_gradient2(low = '#0D456E', mid='#1674b9', high = '#be1724')+
  labs(title = 'Proporção de casos positivos por casos investigados, por UF (2007 - 2019)') +
  labs(x = 'Proporção',
       y = 'Unidade da Federação (UF)') +
  labs(caption = 'Fonte: SIVEP Malária, 2007 - 2019') +
  theme(text = element_text(family = 'Roboto'), plot.title = element_text(hjust = 0.5), plot.caption = element_text(hjust = 0.5))
  #theme_bw()
ggsave(filename = 'ridges.png', plot = v)
