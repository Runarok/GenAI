
    const colorPairs = [
[{ name: "Antique White", hex: "#FAEBD7" }, { name: "Sky Blue", hex: "#87CEEB" }],
[{ name: "Aquamarine", hex: "#7FFFD4" }, { name: "Dark Red", hex: "#8B0000" }],
[{ name: "Aquamarine", hex: "#7FFFD4" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Aquamarine", hex: "#7FFFD4" }, { name: "Medium Purple", hex: "#9370DB" }],
[{ name: "Aquamarine", hex: "#7FFFD4" }, { name: "Royal Blue", hex: "#4169E1" }],
[{ name: "Aquamarine", hex: "#7FFFD4" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Bisque", hex: "#FFE4C4" }, { name: "Royal Blue", hex: "#4169E1" }],
[{ name: "Blanched Almond", hex: "#FFEBCD" }, { name: "Dark Goldenrod", hex: "#B8860B" }],
[{ name: "Blanched Almond", hex: "#FFEBCD" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Blanched Almond", hex: "#FFEBCD" }, { name: "Light Gray", hex: "#D3D3D3" }],
[{ name: "Blanched Almond", hex: "#FFEBCD" }, { name: "Medium Slate Blue", hex: "#7B68EE" }],
[{ name: "Blanched Almond", hex: "#FFEBCD" }, { name: "Rosy Brown", hex: "#BC8F8F" }],
[{ name: "Blanched Almond", hex: "#FFEBCD" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Blanched Almond", hex: "#FFEBCD" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Crimson", hex: "#DC143C" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Dark Red", hex: "#8B0000" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Light Goldenrod", hex: "#FAFAD2" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Saddle Brown", hex: "#8B4513" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Thistle", hex: "#D8BFD8" }],
[{ name: "Cadet Blue", hex: "#5F9EA0" }, { name: "Tomato", hex: "#FF6347" }],
[{ name: "Chartreuse", hex: "#7FFF00" }, { name: "Medium Slate Blue", hex: "#7B68EE" }],
[{ name: "Chocolate", hex: "#D2691E" }, { name: "Dark Olive Green", hex: "#556B2F" }],
[{ name: "Chocolate", hex: "#D2691E" }, { name: "Firebrick", hex: "#B22222" }],
[{ name: "Chocolate", hex: "#D2691E" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Chocolate", hex: "#D2691E" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Chocolate", hex: "#D2691E" }, { name: "Tomato", hex: "#FF6347" }],
[{ name: "Coral", hex: "#FF7F50" }, { name: "Antique White", hex: "#FAEBD7" }],
[{ name: "Coral", hex: "#FF7F50" }, { name: "Dark Slate", hex: "#2F4F4F" }],
[{ name: "Coral", hex: "#FF7F50" }, { name: "Medium Purple", hex: "#9370DB" }],
[{ name: "Coral", hex: "#FF7F50" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Coral", hex: "#FF7F50" }, { name: "Rosy Brown", hex: "#BC8F8F" }],
[{ name: "Coral", hex: "#FF7F50" }, { name: "Saddle Brown", hex: "#8B4513" }],
[{ name: "Cornflower Blue", hex: "#6495ED" }, { name: "Pale Violet Red", hex: "#DB7093" }],
[{ name: "Crimson", hex: "#DC143C" }, { name: "Gold", hex: "#FFD700" }],
[{ name: "Crimson", hex: "#DC143C" }, { name: "Light Slate Gray", hex: "#778899" }],
[{ name: "Crimson", hex: "#DC143C" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Crimson", hex: "#DC143C" }, { name: "Medium Spring Green", hex: "#00FA9A" }],
[{ name: "Crimson", hex: "#DC143C" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Crimson", hex: "#DC143C" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Cyan", hex: "#00FFFF" }, { name: "Lemon Chiffon", hex: "#FFFACD" }],
[{ name: "Cyan", hex: "#00FFFF" }, { name: "Light Pink", hex: "#FFB6C1" }],
[{ name: "Dark Blue", hex: "#00008B" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Dark Goldenrod", hex: "#B8860B" }, { name: "Dark Magenta", hex: "#8B008B" }],
[{ name: "Dark Goldenrod", hex: "#B8860B" }, { name: "Light Cyan", hex: "#E0FFFF" }],
[{ name: "Dark Goldenrod", hex: "#B8860B" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Dark Goldenrod", hex: "#B8860B" }, { name: "Misty Rose", hex: "#FFE4E1" }],
[{ name: "Dark Goldenrod", hex: "#B8860B" }, { name: "Rosy Brown", hex: "#BC8F8F" }],
[{ name: "Dark Goldenrod", hex: "#B8860B" }, { name: "Sea Green", hex: "#2E8B57" }],
[{ name: "Dark Khaki", hex: "#BDB76B" }, { name: "Light Blue", hex: "#ADD8E6" }],
[{ name: "Dark Khaki", hex: "#BDB76B" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Dark Khaki", hex: "#BDB76B" }, { name: "Light Salmon", hex: "#FFA07A" }],
[{ name: "Dark Khaki", hex: "#BDB76B" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Dark Khaki", hex: "#BDB76B" }, { name: "Tomato", hex: "#FF6347" }],
[{ name: "Dark Magenta", hex: "#8B008B" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Dark Magenta", hex: "#8B008B" }, { name: "Light Sky Blue", hex: "#87CEFA" }],
[{ name: "Dark Magenta", hex: "#8B008B" }, { name: "Lime Green", hex: "#32CD32" }],
[{ name: "Dark Magenta", hex: "#8B008B" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Dark Olive Green", hex: "#556B2F" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Dark Olive Green", hex: "#556B2F" }, { name: "Dark Goldenrod", hex: "#B8860B" }],
[{ name: "Dark Olive Green", hex: "#556B2F" }, { name: "Lavender", hex: "#E6E6FA" }],
[{ name: "Dark Olive Green", hex: "#556B2F" }, { name: "Light Blue", hex: "#ADD8E6" }],
[{ name: "Dark Olive Green", hex: "#556B2F" }, { name: "Light Goldenrod Yellow", hex: "#FAFAD2" }],
[{ name: "Dark Olive Green", hex: "#556B2F" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Dark Olive Green", hex: "#556B2F" }, { name: "Wheat", hex: "#F5DEB3" }],
[{ name: "Dark Orange", hex: "#FF8C00" }, { name: "Goldenrod", hex: "#DAA520" }],
[{ name: "Dark Orange", hex: "#FF8C00" }, { name: "Misty Rose", hex: "#FFE4E1" }],
[{ name: "Dark Orange", hex: "#FF8C00" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Dark Orchid", hex: "#9932CC" }, { name: "Light Yellow", hex: "#FFFFE0" }],
[{ name: "Dark Orchid", hex: "#9932CC" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Dark Red", hex: "#8B0000" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Dark Red", hex: "#8B0000" }, { name: "Light Goldenrod", hex: "#FAFAD2" }],
[{ name: "Dark Red", hex: "#8B0000" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Dark Red", hex: "#8B0000" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Dark Red", hex: "#8B0000" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Dark Salmon", hex: "#E9967A" }, { name: "Light Slate Gray", hex: "#778899" }],
[{ name: "Dark Salmon", hex: "#E9967A" }, { name: "Sea Green", hex: "#2E8B57" }],
[{ name: "Dark Salmon", hex: "#E9967A" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Dark Sea Green", hex: "#8FBC8F" }, { name: "Lemon Chiffon", hex: "#FFFACD" }],
[{ name: "Dark Slate Blue", hex: "#483D8B" }, { name: "Blanched Almond", hex: "#FFEBCD" }],
[{ name: "Dark Slate Blue", hex: "#483D8B" }, { name: "Floral White", hex: "#FFFAF0" }],
[{ name: "Dark Slate Blue", hex: "#483D8B" }, { name: "Light Gray", hex: "#D3D3D3" }],
[{ name: "Dark Slate Blue", hex: "#483D8B" }, { name: "Papaya Whip", hex: "#FFEFD5" }],
[{ name: "Dark Slate Blue", hex: "#483D8B" }, { name: "Tomato", hex: "#FF6347" }],
[{ name: "Dark Slate Gray", hex: "#2F4F4F" }, { name: "Light Yellow", hex: "#FFFFE0" }],
[{ name: "Dark Slate", hex: "#2F4F4F" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Dark Slate", hex: "#2F4F4F" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Dark Slate", hex: "#2F4F4F" }, { name: "Medium Purple", hex: "#9370DB" }],
[{ name: "Dark Slate", hex: "#2F4F4F" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Dark Slate", hex: "#455453" }, { name: "Grey", hex: "#808080" }],
[{ name: "Dark Turquoise", hex: "#00CED1" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Dark Turquoise", hex: "#00CED1" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Dark Violet", hex: "#9400D3" }, { name: "Mint Cream", hex: "#F5FFFA" }],
[{ name: "Electric Lime", hex: "#CCFF00" }, { name: "Hot Pink", hex: "#FF69B4" }],
[{ name: "Firebrick", hex: "#B22222" }, { name: "Antique White", hex: "#FAEBD7" }],
[{ name: "Firebrick", hex: "#B22222" }, { name: "Light Gray", hex: "#D3D3D3" }],
[{ name: "Firebrick", hex: "#B22222" }, { name: "Light Slate Gray", hex: "#778899" }],
[{ name: "Firebrick", hex: "#B22222" }, { name: "Medium Spring Green", hex: "#00FA9A" }],
[{ name: "Firebrick", hex: "#B22222" }, { name: "Mint Cream", hex: "#F5FFFA" }],
[{ name: "Firebrick", hex: "#B22222" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Forest Green", hex: "#228B22" }, { name: "Light Goldenrod Yellow", hex: "#FAFAD2" }],
[{ name: "Fuchsia", hex: "#FF00FF" }, { name: "Cadet Blue", hex: "#5F9EA0" }],
[{ name: "Gainsboro", hex: "#DCDCDC" }, { name: "Old Lace", hex: "#FDF5E6" }],
[{ name: "Goldenrod", hex: "#DAA520" }, { name: "Cadet Blue", hex: "#5F9EA0" }],
[{ name: "Goldenrod", hex: "#DAA520" }, { name: "Dark Magenta", hex: "#8B008B" }],
[{ name: "Goldenrod", hex: "#DAA520" }, { name: "Lavender", hex: "#E6E6FA" }],
[{ name: "Goldenrod", hex: "#DAA520" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Goldenrod", hex: "#DAA520" }, { name: "Medium Purple", hex: "#9370DB" }],
[{ name: "Goldenrod", hex: "#DAA520" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Honeydew", hex: "#F0FFF0" }, { name: "Medium Spring Green", hex: "#00FA9A" }],
[{ name: "Honeydew", hex: "#F0FFF0" }, { name: "Red", hex: "#FF0000" }],
[{ name: "Hot Pink", hex: "#FF69B4" }, { name: "Powder Blue", hex: "#B0E0E6" }],
[{ name: "Indian Red", hex: "#CD5C5C" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Indigo", hex: "#4B0082" }, { name: "Navajo White", hex: "#FFDEAD" }],
[{ name: "Lavender Blush", hex: "#FFF0F5" }, { name: "Lemon Chiffon", hex: "#FFFACD" }],
[{ name: "Lavender Blush", hex: "#FFF0F5" }, { name: "Wheat", hex: "#F5DEB3" }],
[{ name: "Lavender", hex: "#E6E6FA" }, { name: "Dark Khaki", hex: "#BDB76B" }],
[{ name: "Lavender", hex: "#E6E6FA" }, { name: "Medium Orchid", hex: "#BA55D3" }],
[{ name: "Lavender", hex: "#E6E6FA" }, { name: "Olive", hex: "#808000" }],
[{ name: "Lavender", hex: "#E6E6FA" }, { name: "Saddle Brown", hex: "#8B4513" }],
[{ name: "Lavender", hex: "#E6E6FA" }, { name: "Sandy Brown", hex: "#F4A460" }],
[{ name: "Lavender", hex: "#E6E6FA" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Lemon Chiffon", hex: "#FFFACD" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Light Blue", hex: "#ADD8E6" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Light Blue", hex: "#ADD8E6" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Light Blue", hex: "#ADD8E6" }, { name: "Olive Drab", hex: "#6B8E23" }],
[{ name: "Light Blue", hex: "#ADD8E6" }, { name: "Rosy Brown", hex: "#BC8F8F" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Cadet Blue", hex: "#5F9EA0" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Dark Olive Green", hex: "#556B2F" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Dark Orchid", hex: "#9932CC" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Deep Sky Blue", hex: "#00BFFF" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Rosy Brown", hex: "#BC8F8F" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Royal Blue", hex: "#4169E1" }],
[{ name: "Light Coral", hex: "#F08080" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Light Cyan", hex: "#E0FFFF" }, { name: "Royal Blue", hex: "#4169E1" }],
[{ name: "Light Goldenrod Yellow", hex: "#FAFAD2" }, { name: "Forest Green", hex: "#228B22" }],
[{ name: "Light Goldenrod Yellow", hex: "#FAFAD2" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Light Goldenrod Yellow", hex: "#FAFAD2" }, { name: "Tomato", hex: "#FF6347" }],
[{ name: "Light Goldenrod", hex: "#FAFAD2" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Light Goldenrod", hex: "#FAFAD2" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Light Goldenrod", hex: "#FAFAD2" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Light Goldenrod", hex: "#FAFAD2" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Light Goldenrod", hex: "#FAFAD2" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Light Gray", hex: "#D3D3D3" }, { name: "Dark Olive Green", hex: "#556B2F" }],
[{ name: "Light Gray", hex: "#D3D3D3" }, { name: "Goldenrod", hex: "#DAA520" }],
[{ name: "Light Gray", hex: "#D3D3D3" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Light Gray", hex: "#D3D3D3" }, { name: "Medium Violet Red", hex: "#C71585" }],
[{ name: "Light Gray", hex: "#D3D3D3" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Light Green", hex: "#90EE90" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Light Pink", hex: "#FFB6C1" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Light Pink", hex: "#FFB6C1" }, { name: "Dark Red", hex: "#8B0000" }],
[{ name: "Light Pink", hex: "#FFB6C1" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Light Pink", hex: "#FFB6C1" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Light Salmon", hex: "#FFA07A" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Light Salmon", hex: "#FFA07A" }, { name: "Cornflower Blue", hex: "#6495ED" }],
[{ name: "Light Salmon", hex: "#FFA07A" }, { name: "Deep Pink", hex: "#FF1493" }],
[{ name: "Light Salmon", hex: "#FFA07A" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Light Salmon", hex: "#FFA07A" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Light Salmon", hex: "#FFA07A" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Light Salmon", hex: "#FFA07A" }, { name: "Turquoise", hex: "#40E0D0" }],
[{ name: "Light Sea Green", hex: "#20B2AA" }, { name: "Gold", hex: "#FFD700" }],
[{ name: "Light Sea Green", hex: "#20B2AA" }, { name: "Hot Pink", hex: "#FF69B4" }],
[{ name: "Light Sea Green", hex: "#20B2AA" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Light Sea Green", hex: "#20B2AA" }, { name: "Medium Purple", hex: "#9370DB" }],
[{ name: "Light Sea Green", hex: "#20B2AA" }, { name: "Royal Blue", hex: "#4169E1" }],
[{ name: "Light Sea Green", hex: "#20B2AA" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Light Sky Blue", hex: "#87CEFA" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Light Sky Blue", hex: "#87CEFA" }, { name: "Dark Slate Blue", hex: "#483D8B" }],
[{ name: "Light Sky Blue", hex: "#87CEFA" }, { name: "Light Yellow", hex: "#FFFFE0" }],
[{ name: "Light Sky Blue", hex: "#87CEFA" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Light Sky Blue", hex: "#87CEFA" }, { name: "Pale Violet Red", hex: "#DB7093" }],
[{ name: "Light Slate Blue", hex: "#8470FF" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Light Slate Blue", hex: "#8470FF" }, { name: "Dark Orange", hex: "#FF8C00" }],
[{ name: "Light Slate Blue", hex: "#8470FF" }, { name: "Medium Violet Red", hex: "#C71585" }],
[{ name: "Light Slate Gray", hex: "#778899" }, { name: "Light Pink", hex: "#FFB6C1" }],
[{ name: "Light Steel Blue", hex: "#B0C4DE" }, { name: "Dark Slate Blue", hex: "#483D8B" }],
[{ name: "Lime Green", hex: "#32CD32" }, { name: "Medium Violet Red", hex: "#C71585" }],
[{ name: "Lime", hex: "#00FF00" }, { name: "Dark Magenta", hex: "#8B008B" }],
[{ name: "Medium Aquamarine", hex: "#66CDAA" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Antique White", hex: "#FAEBD7" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Dark Olive Green", hex: "#556B2F" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Dark Red", hex: "#8B0000" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Fuchsia", hex: "#FF00FF" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Light Salmon", hex: "#FFA07A" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Light Sky Blue", hex: "#87CEFA" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Medium Spring Green", hex: "#00FA9A" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Medium Blue", hex: "#0000CD" }, { name: "Saddle Brown", hex: "#8B4513" }],
[{ name: "Medium Orchid", hex: "#BA55D3" }, { name: "Blanched Almond", hex: "#FFEBCD" }],
[{ name: "Medium Orchid", hex: "#BA55D3" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Medium Orchid", hex: "#BA55D3" }, { name: "Light Goldenrod", hex: "#FAFAD2" }],
[{ name: "Medium Orchid", hex: "#BA55D3" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Medium Orchid", hex: "#BA55D3" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Medium Orchid", hex: "#BA55D3" }, { name: "Pale Violet Red", hex: "#DB7093" }],
[{ name: "Medium Purple", hex: "#9370DB" }, { name: "Dark Goldenrod", hex: "#B8860B" }],
[{ name: "Medium Purple", hex: "#9370DB" }, { name: "Light Goldenrod Yellow", hex: "#FAFAD2" }],
[{ name: "Medium Purple", hex: "#9370DB" }, { name: "Pale Violet Red", hex: "#DB7093" }],
[{ name: "Medium Purple", hex: "#9370DB" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Lavender", hex: "#E6E6FA" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Light Goldenrod", hex: "#FAFAD2" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Light Salmon", hex: "#FFA07A" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Light Sky Blue", hex: "#87CEFA" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Medium Orchid", hex: "#BA55D3" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Orchid", hex: "#DA70D6" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Royal Blue", hex: "#4169E1" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Sea Green", hex: "#2E8B57" }],
[{ name: "Medium Sea Green", hex: "#3CB371" }, { name: "Violet", hex: "#EE82EE" }],
[{ name: "Medium Slate Blue", hex: "#7B68EE" }, { name: "Blanched Almond", hex: "#FFEBCD" }],
[{ name: "Medium Slate Blue", hex: "#7B68EE" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Medium Slate Blue", hex: "#7B68EE" }, { name: "Dark Orange", hex: "#FF8C00" }],
[{ name: "Medium Slate Blue", hex: "#7B68EE" }, { name: "Goldenrod", hex: "#DAA520" }],
[{ name: "Medium Slate Blue", hex: "#7B68EE" }, { name: "Light Salmon", hex: "#FFA07A" }],
[{ name: "Medium Slate Blue", hex: "#7B68EE" }, { name: "Tomato", hex: "#FF6347" }],
[{ name: "Medium Spring Green", hex: "#00FA9A" }, { name: "Dark Salmon", hex: "#E9967A" }],
[{ name: "Medium Spring Green", hex: "#00FA9A" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Medium Turquoise", hex: "#48D1CC" }, { name: "Dark Goldenrod", hex: "#B8860B" }],
[{ name: "Medium Turquoise", hex: "#48D1CC" }, { name: "Dark Khaki", hex: "#BDB76B" }],
[{ name: "Medium Turquoise", hex: "#48D1CC" }, { name: "Deep Pink", hex: "#FF1493" }],
[{ name: "Medium Turquoise", hex: "#48D1CC" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Medium Violet Red", hex: "#C71585" }, { name: "Lawn Green", hex: "#7CFC00" }],
[{ name: "Misty Rose", hex: "#FFE4E1" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Misty Rose", hex: "#FFE4E1" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Misty Rose", hex: "#FFE4E1" }, { name: "Light Sky Blue", hex: "#87CEFA" }],
[{ name: "Misty Rose", hex: "#FFE4E1" }, { name: "Royal Blue", hex: "#4169E1" }],
[{ name: "Navajo White", hex: "#FFDEAD" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Olive Drab", hex: "#6B8E23" }, { name: "Medium Spring Green", hex: "#00FA9A" }],
[{ name: "Orchid", hex: "#DA70D6" }, { name: "Dark Slate", hex: "#2F4F4F" }],
[{ name: "Orchid", hex: "#DA70D6" }, { name: "Goldenrod", hex: "#DAA520" }],
[{ name: "Orchid", hex: "#DA70D6" }, { name: "Misty Rose", hex: "#FFE4E1" }],
[{ name: "Orchid", hex: "#DA70D6" }, { name: "Pale Turquoise", hex: "#AFEEEE" }],
[{ name: "Pale Goldenrod", hex: "#EEE8AA" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Pale Goldenrod", hex: "#EEE8AA" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Pale Goldenrod", hex: "#EEE8AA" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Pale Goldenrod", hex: "#EEE8AA" }, { name: "Medium Spring Green", hex: "#00FA9A" }],
[{ name: "Pale Goldenrod", hex: "#EEE8AA" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Pale Turquoise", hex: "#AFEEEE" }, { name: "Medium Orchid", hex: "#BA55D3" }],
[{ name: "Pale Violet Red", hex: "#DB7093" }, { name: "Medium Aquamarine", hex: "#66CDAA" }],
[{ name: "Pale Violet Red", hex: "#DB7093" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Pale Violet Red", hex: "#DB7093" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Papaya Whip", hex: "#FFEFD5" }, { name: "Medium Orchid", hex: "#BA55D3" }],
[{ name: "Peach Puff", hex: "#FFDAB9" }, { name: "Aquamarine", hex: "#7FFFD4" }],
[{ name: "Peach Puff", hex: "#FFDAB9" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Peach Puff", hex: "#FFDAB9" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Peach Puff", hex: "#FFDAB9" }, { name: "Pale Violet Red", hex: "#DB7093" }],
[{ name: "Peru", hex: "#CD853F" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Peru", hex: "#CD853F" }, { name: "Medium Turquoise", hex: "#48D1CC" }],
[{ name: "Red", hex: "#FF0000" }, { name: "Light Yellow", hex: "#FFFFE0" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Cornflower Blue", hex: "#6495ED" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Dark Salmon", hex: "#E9967A" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Lavender", hex: "#E6E6FA" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Medium Orchid", hex: "#BA55D3" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Saddle Brown", hex: "#8B4513" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Rosy Brown", hex: "#BC8F8F" }, { name: "Turquoise", hex: "#40E0D0" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Goldenrod", hex: "#DAA520" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Lavender", hex: "#E6E6FA" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Light Gray", hex: "#D3D3D3" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Light Salmon", hex: "#FFA07A" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Medium Blue", hex: "#0000CD" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Medium Purple", hex: "#9370DB" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Pale Violet Red", hex: "#DB7093" }],
[{ name: "Royal Blue", hex: "#4169E1" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Saddle Brown", hex: "#8B4513" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Saddle Brown", hex: "#8B4513" }, { name: "Dark Red", hex: "#8B0000" }],
[{ name: "Saddle Brown", hex: "#8B4513" }, { name: "Light Slate Blue", hex: "#8470FF" }],
[{ name: "Saddle Brown", hex: "#8B4513" }, { name: "Light Steel Blue", hex: "#B0C4DE" }],
[{ name: "Saddle Brown", hex: "#8B4513" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Saddle Brown", hex: "#8B4513" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Salmon", hex: "#FA8072" }, { name: "Pale Green", hex: "#98FB98" }],
[{ name: "Sandy Brown", hex: "#F4A460" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Sandy Brown", hex: "#F4A460" }, { name: "Light Sea Green", hex: "#20B2AA" }],
[{ name: "Sandy Brown", hex: "#F4A460" }, { name: "Spring Green", hex: "#00FF7F" }],
[{ name: "Sea Green", hex: "#2E8B57" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Sea Green", hex: "#2E8B57" }, { name: "Slate Blue", hex: "#6A5ACD" }],
[{ name: "Sea Green", hex: "#2E8B57" }, { name: "Tomato", hex: "#FF6347" }],
[{ name: "Sea Shell", hex: "#FFF5EE" }, { name: "Dark Slate Grey", hex: "#2F4F4F" }],
[{ name: "Sky Blue", hex: "#87CEEB" }, { name: "Light Pink", hex: "#FFB6C1" }],
[{ name: "Sky Blue", hex: "#87CEEB" }, { name: "Navajo White", hex: "#FFDEAD" }],
[{ name: "Sky Blue", hex: "#87CEEB" }, { name: "Papaya Whip", hex: "#FFEFD5" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Blanched Almond", hex: "#FFEBCD" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Chocolate", hex: "#D2691E" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Cornflower Blue", hex: "#6495ED" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Dark Khaki", hex: "#BDB76B" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Dark Violet", hex: "#9400D3" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Firebrick", hex: "#B22222" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Khaki", hex: "#F0E68C" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Light Salmon", hex: "#FFA07A" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Pale Violet Red", hex: "#DB7093" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Slate Blue", hex: "#6A5ACD" }, { name: "Sandy Brown", hex: "#F4A460" }],
[{ name: "Slate Gray", hex: "#708090" }, { name: "Coral", hex: "#FF7F50" }],
[{ name: "Slate Gray", hex: "#708090" }, { name: "Dark Magenta", hex: "#8B008B" }],
[{ name: "Slate Gray", hex: "#708090" }, { name: "Light Pink", hex: "#FFB6C1" }],
[{ name: "Slate Gray", hex: "#708090" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Slate Gray", hex: "#708090" }, { name: "Pale Goldenrod", hex: "#EEE8AA" }],
[{ name: "Slate Gray", hex: "#708090" }, { name: "Red", hex: "#FF0000" }],
[{ name: "Spring Green", hex: "#00FF7F" }, { name: "Deep Pink", hex: "#FF1493" }],
[{ name: "Spring Green", hex: "#00FF7F" }, { name: "Misty Rose", hex: "#FFE4E1" }],
[{ name: "Steel Blue", hex: "#4682B4" }, { name: "Medium Turquoise", hex: "#48D1CC" }],
[{ name: "Steel Blue", hex: "#4682B4" }, { name: "Misty Rose", hex: "#FFE4E1" }],
[{ name: "Steel Blue", hex: "#4682B4" }, { name: "Rosy Brown", hex: "#BC8F8F" }],
[{ name: "Teal", hex: "#008080" }, { name: "Medium Orchid", hex: "#BA55D3" }],
[{ name: "Teal", hex: "#008080" }, { name: "Peach", hex: "#FFDAB9" }],
[{ name: "Thistle", hex: "#D8BFD8" }, { name: "Goldenrod", hex: "#DAA520" }],
[{ name: "Tomato", hex: "#FF6347" }, { name: "Light Coral", hex: "#F08080" }],
[{ name: "Tomato", hex: "#FF6347" }, { name: "Light Salmon", hex: "#FFA07A" }],
[{ name: "Tomato", hex: "#FF6347" }, { name: "Light Sky Blue", hex: "#87CEFA" }],
[{ name: "Tomato", hex: "#FF6347" }, { name: "Medium Orchid", hex: "#BA55D3" }],
[{ name: "Tomato", hex: "#FF6347" }, { name: "Medium Sea Green", hex: "#3CB371" }],
[{ name: "Tomato", hex: "#FF6347" }, { name: "Navajo White", hex: "#FFDEAD" }],
[{ name: "Tomato", hex: "#FF6347" }, { name: "Slate Gray", hex: "#708090" }],
[{ name: "Turquoise", hex: "#40E0D0" }, { name: "Fuchsia", hex: "#FF00FF" }],
[{ name: "Turquoise", hex: "#40E0D0" }, { name: "Light Pink", hex: "#FFB6C1" }],
[{ name: "Turquoise", hex: "#40E0D0" }, { name: "Light Sky Blue", hex: "#87CEFA" }],
[{ name: "Turquoise", hex: "#40E0D0" }, { name: "Light Yellow", hex: "#FFFFE0" }],
[{ name: "Turquoise", hex: "#40E0D0" }, { name: "Peach Puff", hex: "#FFDAB9" }],
[{ name: "Yellow Green", hex: "#9ACD32" }, { name: "Sienna", hex: "#A0522D" }],
[{ name: "Yellow", hex: "#FFFF00" }, { name: "Dark Red", hex: "#8B0000" }],
[{ name: "Yellow", hex: "#FFFF00" }, { name: "Dark Violet", hex: "#9400D3" }]];

    colorPairs.forEach(pair => {
        document.body.innerHTML += `
            <div class="combo">
                <div class="color-box" style="background-color: ${pair[0].hex};">
                    <div class="color-info">${pair[0].name}<br>${pair[0].hex}</div>
                </div>
                <div class="color-box" style="background-color: ${pair[1].hex};">
                    <div class="color-info">${pair[1].name}<br>${pair[1].hex}</div>
                </div>
                <div class="split-circle">
                    <div class="half-circle-left" style="background-color: ${pair[1].hex};"></div>
                    <div class="half-circle-right" style="background-color: ${pair[0].hex};"></div>
                </div>
            </div>
        `;
    });