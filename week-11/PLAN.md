# WORDLE VARIANT - Vibe Coding Masterclass

## Project Overview

**Build a personalized Wordle-style game from scratch. Start with core mechanics, then make it uniquely yours through theme, features, and polish.
**
---

## PHASE 1: CORE GAME (30 minutes)

**Goal**: Get a playable game working

### Step 1.1: Project Setup

- Create Next.js + TypeScript project
- Set up basic project structure
- Install any needed dependencies (none required initially)

### Step 1.2: Basic UI

- Create 6x5 grid of letter tiles
- Add keyboard input (on-screen keyboard component)
- Simple styling - just make it clear and functional

### Step 1.3: Core Game Logic

- Word validation (5-letter word check)
- Color feedback system:
  - Green: correct letter, correct position
  - Yellow: correct letter, wrong position
  - Gray: letter not in word
- Win/lose conditions
- Use a small hardcoded word list (10-20 words) for now

### Step 1.4: Basic State Management

- Track current guess
- Track previous guesses
- Track game status (playing/won/lost)
- Handle input and submit

**CHECKPOINT**: You should be able to play a complete game and win/lose

---

## PHASE 2: MAKE IT YOURS (45 minutes)

**Goal**: Pick your variant and implement it

### Choose Your Theme:

#### Option A: Dev Wordle

- 5-letter programming terms (ASYNC, REDUX, FETCH, CACHE, etc.)
- Update word list to programming vocabulary
- Add code-themed styling (terminal/IDE aesthetic)

#### Option B: Math Wordle (Nerdle)

- Guess equations that equal a target number (e.g., 12+34=46)
- Handle operators (+, -, \*, /)
- Different validation logic

#### Option C: Color Wordle

- Guess hex color codes (#FF5733)
- Show color preview after each guess
- Visual color similarity feedback

#### Option D: Custom Category

- Pick any 5-letter category you love
- Movies, cities, foods, whatever!
- Create your custom word list

### Step 2.1: Implement Theme Logic

- Update word validation for your variant
- Implement any special rules
- Update UI to reflect theme

### Step 2.2: Expand Word List

- Add at least 50-100 words for your category
- Implement random word selection
- (Optional) Add difficulty levels

**CHECKPOINT**: Your themed variant should be fully playable

---

## PHASE 3: POLISH & JUICE (45 minutes)

**Goal**: Make it feel like a real game

### Step 3.1: Animations

- Tile flip animation when checking guess
- Shake animation for invalid words
- Row reveal animation
- Keyboard key press feedback

### Step 3.2: On-Screen Keyboard

- Full keyboard component with letter colors
- Show which letters are used/unused
- Mobile-friendly tap support
- Keyboard shortcut hints

### Step 3.3: Game Stats

- Track stats in localStorage:
  - Games played
  - Win percentage
  - Current streak
  - Max streak
  - Guess distribution (won in 1, 2, 3, etc.)
- Stats modal/display

### Step 3.4: Share Results

- Generate emoji grid (⬛🟨🟩)
- Copy to clipboard button
- Share text with your game variant name
- "Spoiler-free" format

### Step 3.5: Visual Polish

- Dark mode toggle
- Better color scheme
- Smooth transitions
- Loading states
- Error messages (styled nicely)

**CHECKPOINT**: Game should feel polished and professional

---

## PHASE 4: EXTRA SPICE (Optional 30 minutes)

**Goal**: Add features that make it special

### Pick 2-3 of These:

#### Hard Mode

- Must use revealed letters in subsequent guesses
- Toggle in settings

#### Daily Challenge

- Same word for everyone each day
- Use date-based seed for word selection
- "Come back tomorrow" message

#### Sound Effects

- Keyboard clicks
- Success/failure sounds
- Toggle audio on/off

#### Help/Tutorial

- How to play modal
- Example guesses with explanations
- Rules specific to your variant

#### Settings Menu

- Hard mode toggle
- Color blind mode
- High contrast mode
- Sound toggle
- Reset stats

#### Custom Word Lists

- Allow users to add their own words
- Import/export word lists
- Community word packs

#### Accessibility

- Screen reader support
- Keyboard navigation
- ARIA labels
- High contrast mode

**CHECKPOINT**: Added features work smoothly with core game

---

## PHASE 5: DEPLOYMENT (15 minutes)

**Goal**: Ship it!

### Step 5.1: Pre-Deploy

- Test on mobile viewport
- Check all features work
- Add favicon and meta tags
- Update page title

### Step 5.2: Deploy

- Deploy to Vercel (or Netlify/Cloudflare Pages)
- Test deployed version
- Share link!

---

## SUCCESS CRITERIA

### Minimum Viable Game:

- [ ] 6x5 grid with working input
- [ ] Color feedback system
- [ ] Win/lose detection
- [ ] On-screen keyboard
- [ ] At least 50 words

### Polished Game:

- [ ] Smooth animations
- [ ] Stats tracking
- [ ] Share functionality
- [ ] Dark mode
- [ ] Mobile responsive

### Impressive Game:

- [ ] Unique theme/variant
- [ ] Multiple difficulty levels
- [ ] Sound effects
- [ ] Daily challenge
- [ ] Settings menu

---

## NOTES FOR IMPLEMENTATION

### Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- No external game libraries needed!

### File Structure Suggestion

```
/app
  /page.tsx          # Main game component
  /components
    /Grid.tsx        # Letter grid
    /Keyboard.tsx    # On-screen keyboard
    /Tile.tsx        # Individual letter tile
    /Modal.tsx       # Stats/Help modals
  /lib
    /words.ts        # Word lists
    /gameLogic.ts    # Validation, checking
    /stats.ts        # Stats management
```

### Development Tips

- Start simple, add complexity gradually
- Test each phase thoroughly before moving on
- Don't worry about perfect code - focus on working features
- Animations can be added last if running short on time
- Use localStorage for persistence (no backend needed)

---

## LET'S VIBE! 🎮

Start with Phase 1 and work through step by step. Don't rush to Phase 2 until Phase 1 is solid. Have fun and make it yours!
