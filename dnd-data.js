// ============================================
// OC FOUNDRY — D&D 5E DATA POOLS (EXPANDED)
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
    halfelf: ["Tristan Vane", "Aria Whisperwind", "Julian Cross", "Eliana Shadows", "Corin Dawnlight"]
  },

  hooks: [
    "Carries an ancient map drawn on dragon scale that shows a dungeon that moves every full moon.",
    "Pledged a vow of silence until they slay the warlord who burned their hometown.",
    "Owes a soul-debt to an archfey who occasionally demands strange errands at midnight.",
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
    warlock: "Otherworldly Patron Feature & Pact Magic (1st-level slot)"
  },

  spells: {
    fighter: "Battle Maneuvers: Precision Strike, Riposte, Trip Attack",
    wizard: "Cantrips: Fire Bolt, Mage Hand, Prestidigitation. Spells: Shield, Magic Missile, Sleep",
    rogue: "Cunning Action: Dash, Disengage, Hide. Tool Expertise: Thieves' Tools",
    cleric: "Cantrips: Sacred Flame, Thaumaturgy, Guidance. Spells: Cure Wounds, Bless, Guiding Bolt",
    bard: "Cantrips: Vicious Mockery, Minor Illusion. Spells: Dissonant Whispers, Healing Word, Healing",
    paladin: "Divine Smite (2d8 radiant), Divine Sense, Lay on Hands",
    barbarian: "Primal Rage: Advantage on Strength checks, Resistance to Bludgeoning/Piercing/Slashing",
    druid: "Cantrips: Thorn Whip, Druidcraft. Spells: Entangle, Thunderwave, Cure Wounds",
    monk: "Martial Arts (1d4), Ki Points (Flurry of Blows, Patient Defense)",
    ranger: "Spells: Hunter's Mark, Goodberry, Absorb Elements",
    sorcerer: "Cantrips: Ray of Frost, Minor Illusion. Spells: Chromatic Orb, Burning Hands",
    warlock: "Cantrips: Eldritch Blast, Minor Illusion. Spells: Hellish Rebuke, Armor of Agathys"
  },

  equipment: [
    "Longsword, chain mail, wooden shield, explorer's pack, 15 gp",
    "Spellbook, quarterstaff, scholar's pack, component pouch, 10 gp",
    "Two daggers, shortbow with 20 arrows, leather armor, burglar's pack, thieves' tools, 15 gp",
    "Mace, scale mail, holy symbol, priest's pack, shield, 10 gp",
    "Rapier, leather armor, lute, diplomat's pack, 15 gp"
  ],

  trinkets: [
    "A brass orb etched with moving constellations that spin when held.",
    "A small leather pouch containing 4 carved wooden dice that never land on 1.",
    "A heavy iron key that hums faintly when brought near cold iron.",
    "A silver locket containing a lock of hair from a person who died 200 years ago.",
    "A glass vial filled with glowing blue liquid that never boils or freezes."
  ],

  ideals: [
    "Greater Good: My gifts are meant to protect those who cannot protect themselves.",
    "Independence: I am free to choose my own destiny, regardless of tradition.",
    "Knowledge: The secret to power lies in uncovering forgotten truths.",
    "Honor: My word is my bond, and I will die before breaking a promise.",
    "Freedom: Tyranny in any form must be brought down, no matter the cost."
  ],

  bonds: [
    "I carry a debt to the mentor who trained me, and I will one day repay them.",
    "My hometown was destroyed, and I wander to find the survivors.",
    "An ancient temple artifact was stolen on my watch; I will return it or die trying.",
    "My older sibling vanished in the Underdark, and I seek clues to their whereabouts.",
    "I am bound to a fellowship of heroes who swore a secret pact long ago."
  ],

  flaws: [
    "I am overly trusting of those who claim to share my ideals.",
    "My pride causes me to refuse help, even when I am severely wounded.",
    "I am prone to reckless action whenever my past is mentioned.",
    "I struggle to hide my contempt for nobles and corrupt authority.",
    "I carry a dark secret that could destroy my reputation if revealed."
  ],

  palettes: [
    ["#D4A5A5", "#F0D5C0", "#8B7355", "#2C2420"],
    ["#A78BFA", "#FDE68A", "#475569", "#0F172A"],
    ["#86EFAC", "#FBCFE8", "#65a30d", "#1c1917"],
    ["#38BDF8", "#F1F5F9", "#0284C7", "#0F172A"],
    ["#F97316", "#FACC15", "#7C2D12", "#18181B"]
  ],

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

  relationships: [
    [
      { role: "Mentor / Patron", name: "Archmage Vaelen", note: "Taught them the basics of their craft. Demands occasional progress reports via magic message." },
      { role: "Rival Adventurer", name: "Kaelen the Swift", note: "A competitive mercenary who always seems to take the bounty one hour before our hero arrives." },
      { role: "Guild Contact", name: "Old Bram at the Yawning Portal", note: "An informant who trades tavern rumors for silver coins and good ale." }
    ],
    [
      { role: "Fallen Companion", name: "Soren Ironhand", note: "A former party member who fell during their first dungeon run. Our hero carries his signet ring." },
      { role: "Reluctant Ally", name: "Captain Vane", note: "A city guard captain who turns a blind eye to our hero's methods in exchange for results." },
      { role: "Fey / Divine Contact", name: "Whisper", note: "A strange sprite or celestial voice that offers guidance during long rests." }
    ]
  ],

  questHooks: [
    "A local noble hired them to retrieve a stolen family heirloom currently sitting in a kobold-infested ruin.",
    "They hold half of a ciphered journal leading to an ancient sunken temple; someone is hunting them for the other half.",
    "A mysterious bounty has been placed on their head by a cult they didn't even know they crossed.",
    "Their childhood home was swallowed by a sudden rift into the Shadowfell, and they are seeking the ritual to reverse it.",
    "An old party member vanished inside a cursed dungeon, leaving behind a letter addressed specifically to them."
  ]
};
