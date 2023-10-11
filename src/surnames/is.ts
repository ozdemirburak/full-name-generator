/* Original data source: Statistics Iceland - Ranks of male names by age group, 1st January 2023 */
/* License: Creative Commons Attribution 4.0 International (CC BY 4.0) */
/* URL: https://statice.is/statistics/population/births-and-deaths/names/ */
/* Methodology: Selected top 30 male names from age groups 30+, then applied Icelandic patronymic naming rules (genitive case + son/dóttir) to generate surnames */
const icelandicSurnames = {
    0: [
        'Jónsson', 'Sigurðarson', 'Guðmundarson', 'Gunnarsson', 'Ólafsson', 'Einarsson', 'Magnússon', 'Kristjánsson', 'Stefánsson', 'Jóhannsson',
        'Bjarnarson', 'Árnason', 'Bjarnason', 'Helgason', 'Halldórsson', 'Pétursson', 'Kristinsson', 'Gíslason', 'Ragnarsson', 'Sveinsson',
        'Guðjónsson', 'Þorsteinsson', 'Pálsson', 'Birgisson', 'Karlsson', 'Óskarsson', 'Hauksson', 'Harðarson', 'Arnarsson', 'Davíðsson'
    ],
    1: [
        'Jónsdóttir', 'Sigurðardóttir', 'Guðmundardóttir', 'Gunnarsdóttir', 'Ólafsdóttir', 'Einarsdóttir', 'Magnúsdóttir', 'Kristjánsdóttir', 'Stefánsdóttir', 'Jóhannsdóttir',
        'Bjarnardóttir', 'Árnadóttir', 'Bjarnadóttir', 'Helgadóttir', 'Halldórsdóttir', 'Pétursdóttir', 'Kristinsdóttir', 'Gísladóttir', 'Ragnarsdóttir', 'Sveinsdóttir',
        'Guðjónsdóttir', 'Þorsteinsdóttir', 'Pálsdóttir', 'Birgisdóttir', 'Karlsdóttir', 'Óskarsdóttir', 'Hauksdóttir', 'Harðardóttir', 'Arnarsdóttir', 'Davíðsdóttir'
    ]
};

export default icelandicSurnames;
