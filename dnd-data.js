// ============================================
// OC FOUNDRY — D&D 5E DATA POOLS
// ============================================

const dndData = {
  races: {
    human: { name: "Human", speed: "30 ft", traits: "Versatile, ambitious, found in every corner of the realm." },
    elf: { name: "High Elf", speed: "30 ft", traits: "Keen senses, fey ancestry, darkvision, cantrip affinity." },
    dwarf: { name: "Mountain Dwarf", speed: "25 ft", traits: "Dwarven combat training, stonecunning, poison resistance." },
    halfling: { name: "Lightfoot Halfling", speed: "25 ft", traits: "Lucky, brave, nimble, naturally stealthy." },
    tiefling: { name: "Tiefling", speed: "30 ft", traits: "Hellish resistance, darkvision, thaumaturgy affinity." },
    dragonborn: { name: "Dragonborn", speed: "30 ft", traits: "Draconic ancestry, elemental breath weapon, damage resistance." },
    gnome: { name: "Forest Gnome", speed: "25 ft", traits: "Gnomish cunning, speak with small beasts, illusion affinity." },
    halforc: { name: "Half-Orc", speed: "30 ft", traits: "Relentless endurance, savage attacks, intimidating presence." },
    halfelf: { name: "Half-Elf", speed: "30 ft", traits: "Fey ancestry, darkvision, skill versatility." }
  },

  classes: {
    fighter: { name: "Fighter", primary: "str", hitDie: "d10", saves: "STR, CON", role: "Martial Master" },
    wizard: { name: "Wizard", primary: "int", hitDie: "d6", saves: "INT, WIS", role: "Arcane Scholar" },
    rogue: { name: "Rogue", primary: "dex", hitDie: "d8", saves: "DEX, INT", role: "Skilled Specialist" },
    cleric: { name: "Cleric", primary: "wis", hitDie: "d8", saves: "WIS, CHA", role: "Divine Champion" },
    bard: { name: "Bard", primary: "cha", hitDie: "d8", saves: "DEX, CHA", role: "Magical Performer" },
    paladin: { name: "Paladin", primary: "str", hitDie: "d10", saves: "WIS, CHA", role: "Holy Warrior" },
    barbarian: { name: "Barbarian", primary: "str", hitDie: "d12", saves: "STR, CON", role: "Primal Fury" },
    druid: { name: "Druid", primary: "wis", hitDie: "d8", saves: "INT, WIS", role: "Nature Guardian" },
    monk: { name: "Monk", primary: "dex", hitDie: "d8", saves: "STR, DEX", role: "Unarmed Ascetic" },
    ranger: { name: "Ranger", primary: "dex", hitDie: "d10", saves: "STR, DEX", role: "Wilderness Wanderer" },
    sorcerer: { name: "Sorcerer", primary: "cha", hitDie: "d6", saves: "CON, CHA", role: "Innate Spellcaster" },
    warlock: { name: "Warlock", primary: "cha", hitDie: "d8", saves: "WIS, CHA", role: "Pact Seeker" }
  },

  alignments: [
    "Lawful Good", "Neutral Good", "Chaotic Good",
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil"
  ],

  backgrounds: [
    "Acolyte", "Folk Hero", "Guild Artisan", "Outlander", "Sage",
    "Soldier", "Criminal", "Noble", "Entertainer", "Urchin", "Hermit"
  ],

  names: {
    human: ["Gideon Vance", "Lyra Blackwood", "Roland Thorne", "Evelyn Mercer", "Caelen Voss", "Soren Drake"],
    elf: ["Aelion Starweaver", "Valerius Moonwhisper", "Isilme Sunstrider", "Thalia Silverleaf", "Elysia Nightshade"],
    dwarf: ["Thorin Ironshield", "Dagmar Granite", "Helga Fireforge", "Bramwell Stonehand", "Kragok Deepminer"],
    halfling: ["Milo Underhill", "Poppy Goodbarrel", "Roscoe Tealeaf", "Clover Bramblewood", "Finnian Swiftfoot"],
    tiefling: ["Malakor Malice", "Vespera Hellfire", "Kaelen Ash", "Ophira Despair", "Malphas Shadowborn"],
    dragonborn: ["Balasar Cinderwing", "Kava Frostfang", "Rudra Sparkscale", "Tiamat's Vow", "Ignis Pyreborn"],
    gnome: ["Fizzwick Sparkplug", "Bramble Copperpot", "Tinker Noodle", "Pip Widget", "Zook Glitterstone"],
    halforc: ["Grok Skullcleaver", "Thokk Ironhide", "Varka Bloodrage", "Karg Bloodfist", "Zula Warbringer"],
    halfelf: ["Tristan Vane", "Aria Whisperwind", "Julian Cross", "Eliana Shadows', 'Corin Dawnlight"]
  },

  hooks: [
    "Carries an ancient map drawn on dragon scale that shows a dungeon that moves every full moon.",
    "Pledged a vow of silence until they slay the warlord who burned their hometown.",
    "Owes a soul-debt to a archfey who occasionally demands strange errands at midnight.",
    "Possesses the broken hilt of a legendary blade that hums whenever undead are near.",
    "Exiled from their order for reading a forbidden tome of dark magic in the royal archives."
  ],

  features: {
    fighter: "Second Wind & Fighting Style (Great Weapon / Archery)",
    wizard: "Arcane Recovery & Spellbook (3 Cantrips, 6 1st-level spells)",
    rogue: "Sneak Attack (1d6) & Thieves' Cant",
    cleric: "Divine Domain Feature & Spellcasting (Wisdom Focus)",
    bard: "Bardic Inspiration (d6) & Spellcasting (Charisma Focus)",
    paladin: "Divine Sense & Lay on Hands (5 HP pool)",
    barbarian: "Rage (2/day, +2 damage) & Unarmored Defense",
    druid: "Druidic Language & Spellcasting (Wild Shape Focus)",
    monk: "Unarmed Strike (1d4) & Unarmored Defense (DEX + WIS)",
    ranger: "Favored Enemy & Natural Explorer (Wilderness Specialist)",
    sorcerer: "Sorcerous Origin Feature & Font of Magic",
    warlock: "Otherworldy Patron Feature & Pact Magic (1st-level slot)"
  },

  equipment: [
    "Longsword, chain mail, wooden shield, explorer's pack, 15 gp",
    "Spellbook, quarterstaff, scholar's pack, component pouch, 10 gp",
    "Two daggers, shortbow with 20 arrows, leather armor, burglar's pack, thieves' tools, 15 gp",
    "Mace, scale mail, holy symbol, priest's pack, shield, 10 gp",
    "Rapier, leather armor, lute, diplomat's pack, 15 gp"
  ],

  palettes: [
    ["#D4A5A5", "#F0D5C0", "#8B7355", "#2C2420"],
    ["#A78BFA", "#FDE68A", "#475569", "#0F172A"],
    ["#86EFAC", "#FBCFE8", "#65a30d", "#1c1917"],
    ["#38BDF8", "#F1F5F9", "#0284C7", "#0F172A"],
    ["#F97316", "#FACC15", "#7C2D12", "#18181B"]
  ]
};
  // EXTENDED DOSSIER POOLS FOR PAID PDF
  tactics: {
    fighter: "Opens combat with Action Surge to strike the strongest threat. Uses positioning to protect squishier allies and holds the front line relentlessly.",
    wizard: "Stays 30ft back behind cover. Casts Crowd Control spells (Sleep/Web) first, saving shield/counter magic for enemy casters.",
    rogue: "Uses Cunning Action (Bonus Action Hide/Disengage) every turn to gain Advantage and trigger Sneak Attack from the shadows.",
    cleric: "Casts Bless or Shield of Faith on martial allies first. Stays near the center of the party to deliver Healing Word when allies drop.",
    bard: "Hands out Bardic Inspiration before combat starts. Uses Vicious Mockery to impose disadvantage on enemy powerhouse attackers.",
    paladin: "Saves spell slots exclusively for Divine Smite on critical hits. Stays within 10ft of allies to share aura buffs.",
    barbarian: "Rages immediately on turn 1. Charges straight for the largest enemy target using Reckless Attack for maximum damage.",
    druid: "Casts Entangle or Moonbeam to control the battlefield, then shifts into Wild Shape to tank damage.",
    monk: "Uses Step of the Wind to dart past frontliners and stun enemy spellcasters in the backline.",
    ranger: "Marks targets with Hunter's Mark from 120ft away, picking off flying or ranged threats first.",
    sorcerer: "Uses Metamagic (Twinned / Quickened Spell) to burst down high-priority targets in the first two rounds.",
    warlock: "Fires Eldritch Blast with Repelling Blast from high ground, knocking enemies into hazards or away from allies."
  },

  questHooks: [
    "A local noble hired them to retrieve a stolen family heirloom currently sitting in a kobold-infested ruin.",
    "They hold half of a ciphered journal leading to an ancient sunken temple; someone is hunting them for the other half.",
    "A mysterious bounty has been placed on their head by a cult they didn't even know they crossed.",
    "Their childhood home was swallowed by a sudden rift into the Shadowfell, and they are seeking the ritual to reverse it.",
    "An old party member vanished inside a cursed dungeon, leaving behind a letter addressed specifically to them."
  ]
};
