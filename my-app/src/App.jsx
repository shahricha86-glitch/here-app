import { useState, useEffect, useRef } from "react";
import { Shuffle, RotateCcw, Sun, Cloud, Zap, Clock, Timer, CalendarClock, Home, Sofa, Briefcase, MapPin } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const recommendations = {"home_flexible":{"drained":{"few_minutes":["Open a window. Let some outside noise in — voices, traffic, birds. You don't have to do anything else.","Write someone's name on a piece of paper and one thing you appreciate about them. You don't have to give it to them. Just write it.","Send someone a one-line text. Doesn't need a reply. 'Thinking of you today' is enough.","Put something on that reminds you of a person you love. Let the association do the work."],"little_while":["Go somewhere with ambient people — a café, a bench, a lobby. You don't have to talk to anyone. Just be near humans for a bit.","Write a proper letter to someone you miss. Not a text — actual sentences on paper. You don't have to send it.","Leave something small outside your door with a little note saying 'free to take' — a book you've finished, a plant cutting, anything. It's for whoever finds it.","Sit near a window. Watch whoever passes. You don't have to do anything — just let the world exist near you."],"a_bit":["Is there someone in your life you feel safe being quiet with? Reach out and just say you're a bit low. You don't need to explain more than that.","Go outside with no destination. If you pass someone, notice them. That's all.","Write out a memory of a time you felt genuinely connected to someone. Be specific — the place, what was said, what the light was like.","Scroll back 8 or 9 years on your phone. Find a photo of a time you were with people you love. Let yourself be in that moment for a minute."]},"okay":{"few_minutes":["Text someone a specific question — not 'how are you' but something real and particular to them. Then wait for the reply before opening anything else.","Find a postcard or a piece of paper and write three lines to someone you haven't been in touch with. You can send it or not.","Send a voice note instead of a text. Same time, completely different feeling on the other end.","Look up something a friend mentioned recently — a book, a place, something they were excited about. Send them one line about it."],"little_while":["Call someone instead of texting. No agenda. Just 'I had a few minutes and thought of you.'","Write a note — by hand — and leave it somewhere someone will find it. A housemate, a neighbour, anyone. Something small and true.","Go for a short walk. If you pass a corner shop or a café, go in and buy something small. Make a small moment of the transaction.","Text someone and make a loose plan — nothing elaborate, just 'let's do something this week.' The plan doesn't have to be big to matter."],"a_bit":["Think of something small you've been wanting to do with another person. Reach out and make it happen this week.","Write a proper message to someone you've been meaning to thank — for something specific, something they may not know mattered to you.","Go somewhere new in your neighbourhood. A different street, a café you haven't tried. Newness makes you more present and presence makes you more open.","Call someone you haven't spoken to in a while. Not to catch up on everything — just to hear their voice for a few minutes."]},"good_energy":{"few_minutes":["Tell someone something specific you've noticed about them lately. Not a compliment exactly — more of an observation. It just has to be true.","Send a voice note to someone you haven't contacted in a while. Keep it short — 'thought of you, hope you're good.'","Buy something small for someone on your way somewhere today — a coffee, a pastry, something they'd like. Drop it off or send it ahead.","Think of one person who could use a small lift today. Send them something that would make them smile."],"little_while":["This is a good day to do the thing you keep almost doing. Reach out to that person, suggest that plan. You have the energy for it right now.","Write someone a note telling them something they did that stuck with you. Post it if you can — actual mail lands differently than a message.","Go somewhere you might run into people you know. Stay a little longer than you normally would.","Pick up the phone and call someone instead of waiting for a reason to. The reason is that you feel like it."],"a_bit":["Invite someone over for no reason. Not a plan, not an occasion. Just 'I'm around, come by if you feel like it.' If they can't make it, that's fine — the reaching out is the thing.","Make something for someone today — food, a playlist, a small drawing — and get it to them somehow.","Think of someone who lives nearby that you keep meaning to see. Today's a good day to just show up.","Write a proper letter to someone you care about and post it. Getting a letter in the mail is rare enough to mean something."]}},"home_stay":{"drained":{"few_minutes":["Sit near a window for a few minutes. Watch whoever passes. You don't have to do anything — just let the world exist near you.","Send someone a one-line text. It doesn't need a reply. 'Thinking of you' is enough.","Scroll back 8 or 9 years on your phone — or get out a printed photo if you have one. Find a moment when you felt close to someone. Just sit with it.","Put something on in the background that reminds you of a person — a show you watched together, music they love. Let the association be company."],"little_while":["Send a voice note to someone you haven't spoken to in a while. You can do it from wherever you are right now.","Write a letter to someone you miss. Proper sentences, on paper. You don't have to send it — the writing is the thing.","Write out a list of people who have mattered to you. Don't do anything with it. Just let yourself remember that they exist.","Text someone who would just get it today — no explanation needed. Sometimes being understood by one person is enough."],"a_bit":["Is there someone who could come to you? You don't have to host or perform. Just say 'I could use some company, want to come by?'","Write out a memory of a time you felt genuinely close to someone. Be specific about the details — it'll feel more real.","Call someone instead of texting. No agenda. Just 'I had a moment and thought of you.'","Write a note to someone — by hand — telling them one thing they mean to you. Post it when you're ready, or don't. Either way, write it."]},"okay":{"few_minutes":["Text someone a specific question — something real and particular to them, not 'how are you.'","Find something small at home that reminds you of someone. Send them a photo of it with no explanation.","Write three lines on paper to someone you've been meaning to reach out to. Send it as a photo if you can't post it.","Send a voice note to a friend instead of a text. Same time, completely different landing."],"little_while":["Call someone instead of scrolling. Even ten minutes of a real voice does something a feed never will.","Write an actual letter — on paper — to someone you care about. Post it if you can. Getting a letter in the mail is rare enough to mean something.","Make something for someone you can drop off or send today. It doesn't have to be much — the gesture is the point.","Text a few people and start a loose plan for something social — even weeks away. Having something to look forward to changes how today feels."],"a_bit":["Invite someone into your space. You don't need to clean up or have a reason. Just open the door.","Sit down and write out everything you'd want to say to someone if you were being completely honest. Send it or don't — but write it properly.","Think about what kind of connection you're actually missing right now. Then reach out to the specific person who could give you that.","Make a concrete plan with someone — not 'we should catch up' but an actual time. Even if it's weeks away it'll feel good to have it in place."]},"good_energy":{"few_minutes":["Tell someone something that made you smile today. Share the moment outward.","Write a few lines to someone telling them something specific they did that you're still grateful for. Send it any way you can.","Look up something a friend mentioned recently — a book, a place, something they were excited about. Send them one line about it.","Think of one person who could use a small lift today. Send them something that would make them smile."],"little_while":["Reach out to someone you've been meaning to reconnect with. You have the energy today — use it before the day gets away from you.","Make a concrete plan with someone — not 'we should catch up' but an actual time and place.","Write a proper note to someone who has helped you recently. Post it if you can — actual mail lands differently than a message.","Call someone for no reason other than you feel like it. That's reason enough."],"a_bit":["Invite someone over who fits into your current life — someone who won't need entertaining, who'll just slot in. If they can't make it, that's fine — you asked.","Make something today — food, a playlist, a small handmade thing — and get it to someone who'd appreciate it.","Think of something small you've been wanting to do with another person. Start making it happen from right where you are.","Write a proper letter to someone you care about and post it. Getting something in the mail is rare enough to land differently."]}},"workplace":{"drained":{"few_minutes":["Next time you get water or take a break, leave your phone where it is. Just be in the room with the other people in it.","Notice one person near you doing their job well today. You don't have to say anything — just notice.","Next time you're waiting for something, resist filling the moment with your phone. Just be present in the space.","Take your break somewhere slightly different today. Even moving one room over changes something small but real."],"little_while":["Find a spot to take your break that isn't your usual one. Somewhere with a bit of human noise around you. You don't have to talk to anyone.","Is there someone at work you feel easy around? Spend your break near them. No agenda needed.","Let yourself be a quiet presence today. You don't have to connect — just be around people without retreating completely.","If there's background noise around you — voices, movement — let yourself just be in it for a bit without tuning it out."],"a_bit":["Eat your break somewhere communal — the break room, outside, wherever people tend to gather. Leave your phone in your pocket.","Write a short note to a colleague who's been doing good work lately. Leave it on their desk or send it as a message. No need to make a thing of it.","Find a quiet spot somewhere in the building you've never sat. Just exist somewhere different for a bit.","Have one conversation today that has nothing to do with work. Even five minutes of it changes the texture of the day."]},"okay":{"few_minutes":["Next time you pass a colleague, stop for a second instead of nodding through. Ask them one thing — anything real.","Leave a small note for a colleague — on their desk, in the break room — something that would make them smile. It doesn't need a signature.","Notice if anyone around you seems like they could use a moment of being seen. A word or small acknowledgment is enough.","Ask someone something you're actually curious about — not small talk, something real."],"little_while":["Take your break with someone instead of alone. It doesn't need to be planned — just ask whoever's nearby.","Have one conversation today that has nothing to do with work. Even five minutes of it changes the texture of the day.","Pick up something small to share next time you're near a shop — something for the desk, the break room, anywhere people gather. The gesture shifts the atmosphere.","Step outside if you can, even briefly. Invite someone to come with you. The change of scene loosens things."],"a_bit":["Suggest a walk to a colleague instead of a meeting or a message. Same conversation, completely different energy.","Find the person on your team you know the least. Ask them something genuinely curious — not about their role, about them as a person.","Write a proper thank you note to someone at work — for something specific they did. Leave it somewhere they'll find it.","Be the one who lingers a little after something ends — a break, a task, a shift handover. The best conversations happen in those unplanned moments."]},"good_energy":{"few_minutes":["Tell someone something specific you noticed about their work recently. It lands completely differently than a generic compliment.","Be the person who makes the first move today. A hello, a check-in, a real question. Someone will be glad you did.","Leave something small and thoughtful for someone at work — a note, a snack, a book you think they'd like. No explanation needed.","Tell someone today that something they did recently made a difference. Be specific about what and why."],"little_while":["Invite someone for a break who might not get asked often — the quiet ones, the new ones, the ones who usually eat alone.","Pick up something small to share with the whole room — it doesn't have to be much. The gesture shifts the atmosphere.","Introduce two colleagues who don't know each other well but probably would get along. Even casually, it leaves a mark.","Use this energy to have a slightly more honest conversation than usual — not heavy, just one notch more real than the default."],"a_bit":["Organise something small and spontaneous — a group coffee run, a walk, anything that gets people away from their usual spots together.","Find someone who seems flat today and give them a few minutes of your full attention. Ask how they're actually doing and mean it.","Write a note to someone at work who doesn't often get recognised — the person who keeps things running quietly. Leave it somewhere they'll find it.","Suggest something social outside of work — even vaguely, even weeks away. 'We should actually do that sometime' said with intent is a start."]}},"out_and_about":{"drained":{"few_minutes":["Find somewhere to sit for a moment. Just watch the world move around you. You don't have to be part of it right now.","If you're waiting for something — a train, a coffee — put your phone away. Just be in the space and let other people exist around you.","Next time someone serves you something, make eye contact and say thank you like you mean it. That's all.","Notice one person nearby doing something ordinary. Just watch for a moment. No need to interact."],"little_while":["Find a place to sit where people pass by — a bench, a café corner, a step. Let the world come to you for a bit.","Go somewhere with ambient life — a market, a park, a busy street — and move through it slowly. No destination needed.","Buy a coffee or something small somewhere with people in it. Sit down. Stay longer than you normally would.","Is there someone nearby you could call while you walk? Not to catch up — just to have a voice with you for a bit."],"a_bit":["Let yourself wander somewhere you haven't been. No plan, no purpose. Just see what's there and who's in it.","Find a café or a spot you like and stay longer than usual. Order something if you can. Let yourself be somewhere instead of just passing through.","Pick up something small for someone while you're out — something that made you think of them. Drop it off or leave it for them later.","Go somewhere you might run into people you know. If you do, stop. If you don't, that's fine too — you were out."]},"okay":{"few_minutes":["Make eye contact and smile at whoever serves you next. Actually mean it.","Leave something small somewhere a stranger will find it — a good book outside a café, a kind note on a bench. No name needed.","Strike up the smallest possible conversation with whoever is nearest — the person at the counter, someone waiting alongside you. Just one exchange.","If you're passing a busker or someone performing, slow down. Give them thirty seconds of real attention."],"little_while":["Go somewhere slightly unfamiliar. A street you don't usually take, a shop you've never been in. Novelty makes you more present.","Sit somewhere public and properly people-watch — not on your phone, just actually looking. It's more restorative than it sounds.","If you're somewhere with a tip jar or a busker, leave something. Make a small moment of generosity out of an ordinary transaction.","Find somewhere with a good atmosphere and stay for a bit. Order something if you can, take your time, be somewhere instead of going somewhere."],"a_bit":["Walk somewhere with no headphones. Let the city or the street just be the thing you're listening to.","Find somewhere you've been meaning to go — a neighbourhood, a market, a spot someone recommended. Today's a good day to actually do it.","Pay for something small for whoever is next in line — their pastry, their parking, anything within reach. Leave before they can react.","Go somewhere you might run into people you know. Stay open to it."]},"good_energy":{"few_minutes":["You're already out — that's half of it. Say something real to whoever you interact with next. Not just transactional.","Notice someone doing something well — a barista, a street musician, anyone. Let them know. A word, a tip, even just a proper thank you.","Leave something generous somewhere — a book outside a café, change at a meter, flowers on a wall. Something small that shifts someone's day.","This energy is good to share. Make a small moment out of nothing with a stranger. See what comes back."],"little_while":["Go somewhere with life in it and let yourself be part of it — not just passing through. Order something, sit down, look up.","Find a busker or a street performer and stop to actually watch for a few minutes. Give something if you can. Stay longer than feels comfortable.","Write a kind note on paper and leave it somewhere public for a stranger to find. Make it specific enough to actually mean something.","Is there somewhere in your city you've always meant to explore? Today feels like the day. Go see what's there."],"a_bit":["This is a good day to say yes to whatever comes up. A detour, a conversation, a place you didn't plan to go. Let the day surprise you a little.","Go somewhere new with the intention of doing one small generous thing before you leave. See how it feels.","Find your favourite spot in the city — or go looking for a new one. You have the time and the energy. Use both.","Pick up something small for someone while you're out — something that made you think of them. Drop it off today if you can."]}}};

// ─── Options ─────────────────────────────────────────────────────────────────
// cardColor drives all three states:
//   default:  bg #FAF5EC, border #C0A080, shadow 2px 2px 0px #C0A080
//   hover:    bg cardColor+"28" (16% tint), border #5C3D28, shadow 0px 8px 20px cardColor+"55"
//   selected: bg cardColor (solid), border #5C3D28, shadow 4px 4px 0px #5C3D28

const MOOD_OPTIONS = [
  {
    id: "drained", label: "Drained", desc: "low energy, need something gentle", Icon: Cloud,
    cardColor: "#C0B0CC", // dusty lavender
  },
  {
    id: "okay", label: "Okay", desc: "somewhere in the middle", Icon: Sun,
    cardColor: "#AABFA6", // dusty sage
  },
  {
    id: "good_energy", label: "Good energy", desc: "open and ready", Icon: Zap,
    cardColor: "#EDD98A", // soft yellow
  },
];

const TIME_OPTIONS = [
  {
    id: "few_minutes", label: "A few minutes", desc: "5–7 mins", Icon: Clock,
    cardColor: "#E8A882", // dusty peach
  },
  {
    id: "little_while", label: "A little while", desc: "around 8–10 mins", Icon: Timer,
    cardColor: "#AABFA6", // dusty sage
  },
  {
    id: "a_bit", label: "A bit", desc: "12 minutes or more", Icon: CalendarClock,
    cardColor: "#EDD98A", // soft yellow
  },
];

const LOCATION_OPTIONS = [
  {
    id: "home_flexible", label: "At home, flexible", desc: "free to step out", Icon: Home,
    cardColor: "#AABFA6", // dusty sage
  },
  {
    id: "home_stay", label: "At home, need to stay", desc: "can't leave right now", Icon: Sofa,
    cardColor: "#E8A882", // dusty peach
  },
  {
    id: "workplace", label: "Workplace", desc: "office, shop, anywhere", Icon: Briefcase,
    cardColor: "#EDD98A", // soft yellow
  },
  {
    id: "out_and_about", label: "Out and about", desc: "already in the world", Icon: MapPin,
    cardColor: "#C0B0CC", // dusty lavender
  },
];

const WASHI_COLOR = "#c9856672";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useAnimatedMount(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ option, selected, onSelect, index }) {
  const visible = useAnimatedMount(index * 85 + 120);
  // Alternating rotation — hand-placed feel, fixed per card
  const rotations = [0.7, -0.6, 0.5, -0.8];
  const rotation = rotations[index % rotations.length];
  const { Icon, cardColor } = option;

  // Derive tints from cardColor for hover bg and hover shadow
  const hoverBg     = cardColor + "28"; // 16% opacity tint
  const hoverShadow = `0px 8px 20px ${cardColor}55`; // spread shadow

  return (
    <button
      onClick={() => onSelect(option.id)}
      style={{
        width: "clamp(148px, 28vw, 182px)",
        minHeight: "162px",
        // default bg
        background: selected ? cardColor : "#FAF5EC",
        border: `1.5px solid ${selected ? "#5C3D28" : "#C0A080"}`,
        borderRadius: "3px",
        padding: "16px 14px 14px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        textAlign: "left",
        transform: visible
          ? `rotate(${rotation}deg) scale(${selected ? 1.04 : 1})`
          : `rotate(${rotation}deg) translateY(20px)`,
        opacity: visible ? 1 : 0,
        transition: [
          `transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.05}s`,
          `opacity 0.55s ease ${index * 0.05}s`,
          "box-shadow 0.25s ease",
          "background 0.25s ease",
          "border-color 0.25s ease",
        ].join(", "),
        // default: hard offset stamp shadow
        boxShadow: selected
          ? "4px 4px 0px #5C3D28"  // selected: deeper hard offset, card is down
          : "2px 2px 0px #C0A080", // default: light hard offset
        fontFamily: "inherit",
      }}
      onMouseEnter={e => {
        if (!selected) {
          const el = e.currentTarget;
          el.style.background = hoverBg;
          el.style.borderColor = "#5C3D28";
          el.style.transform = `rotate(${rotation}deg) translateY(-3px) scale(1.01)`;
          el.style.boxShadow = hoverShadow;
          el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease";
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          const el = e.currentTarget;
          el.style.background = "#FAF5EC";
          el.style.borderColor = "#C0A080";
          el.style.transform = `rotate(${rotation}deg) scale(1)`;
          el.style.boxShadow = "2px 2px 0px #C0A080";
          el.style.transition = "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease";
        }
      }}
    >
      <Icon size={19} strokeWidth={1.5} color={selected ? "#3d2e1e" : "#7a6450"} />
      <div>
        {/* Lora — label. #3d2e1e on all card fills ≥ 4.5:1 WCAG AA */}
        <div style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "0.92rem",
          fontWeight: 600,
          color: "#3d2e1e",
          marginBottom: "4px",
          lineHeight: 1.3,
        }}>
          {option.label}
        </div>
        {/* Patrick Hand — desc. #5a3e20 on fills ≥ 4.5:1 */}
        <div style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: "0.9rem",
          color: selected ? "#5a3e20" : "#826a54",
          lineHeight: 1.35,
        }}>
          {option.desc}
        </div>
      </div>
    </button>
  );
}

// ─── Question Block ───────────────────────────────────────────────────────────

function QuestionBlock({ question, options, selected, onSelect }) {
  const visible = useAnimatedMount(40);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: "opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
      marginBottom: "52px",
    }}>
      {/* Lora #3d2e1e on #f2ead8 = 10.91:1, WCAG AAA */}
      <h2 style={{
        fontFamily: "'Lora', Georgia, serif",
        fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)",
        fontWeight: 400,
        color: "#3d2e1e",
        marginBottom: "22px",
        lineHeight: 1.45,
      }}>
        {question}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
        {options.map((opt, i) => (
          <Card
            key={opt.id}
            option={opt}
            selected={selected === opt.id}
            onSelect={onSelect}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Recommendation Card ──────────────────────────────────────────────────────

function RecommendationCard({ text, mood, time, location, onShuffle, onReset, shuffling }) {
  const visible = useAnimatedMount(80);
  const textRef = useRef(null);
  const cardInnerRef = useRef(null);
  const [linePositions, setLinePositions] = useState([]);
  const [washiVisible, setWashiVisible] = useState(false);
  const washiTimer = useRef(null);

  // Washi: hide immediately on shuffle, fade in after new content settles
  useEffect(() => {
    clearTimeout(washiTimer.current);
    if (!shuffling && visible) {
      washiTimer.current = setTimeout(() => setWashiVisible(true), 500);
    } else {
      setWashiVisible(false);
    }
    return () => clearTimeout(washiTimer.current);
  }, [shuffling, visible, text]);

  // Compute ruled line positions from actual text baselines
  useEffect(() => {
    if (!textRef.current || !cardInnerRef.current) return;
    const compute = () => {
      const el = textRef.current;
      const cardEl = cardInnerRef.current;
      if (!el?.firstChild || !cardEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const textContent = el.textContent;
      if (!textContent) return;

      const range = document.createRange();
      const textNode = el.firstChild;
      const lines = [];
      let prevBottom = null;

      for (let i = 0; i < textContent.length; i++) {
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        const rects = range.getClientRects();
        if (!rects.length) continue;
        const bottom = Math.round(rects[0].bottom - cardRect.top);
        if (prevBottom === null || Math.abs(bottom - prevBottom) > 5) {
          if (prevBottom !== null) lines.push(prevBottom);
          prevBottom = bottom;
        }
      }
      if (prevBottom !== null) lines.push(prevBottom);
      setLinePositions(lines);
    };
    const t = setTimeout(compute, 80);
    return () => clearTimeout(t);
  }, [text, visible]);

  const moodLabel = MOOD_OPTIONS.find(m => m.id === mood)?.label || mood;
  const timeLabel = TIME_OPTIONS.find(t => t.id === time)?.label || time;
  const locLabel  = LOCATION_OPTIONS.find(l => l.id === location)?.label || location;

  return (
    <div style={{
      opacity: visible && !shuffling ? 1 : 0,
      transform: visible && !shuffling
        ? "translateY(0) rotate(-0.35deg)"
        : "translateY(32px) rotate(-0.35deg)",
      transition: "opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)",
      position: "relative",
      maxWidth: "520px",
      width: "100%",
    }}>

      {/* Washi tape */}
      <div style={{
        position: "absolute",
        top: "-13px",
        left: "50%",
        transform: "translateX(-50%) rotate(-1.8deg)",
        width: "108px",
        height: "27px",
        background: WASHI_COLOR,
        borderRadius: "2px",
        zIndex: 10,
        opacity: washiVisible ? 1 : 0,
        transition: "opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div
        ref={cardInnerRef}
        style={{
          background: "#faf6ee",
          borderRadius: "3px",
          border: "1.5px solid #d4c5a9",
          boxShadow: "4px 7px 22px rgba(0,0,0,0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ruled lines — under text only, with side margins */}
        {linePositions.map((yPos, i) => (
          <div key={i} style={{
            position: "absolute",
            left: "32px",
            right: "32px",
            top: `${yPos}px`,
            height: "1px",
            background: "#cfc4ae",
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ padding: "34px 32px 26px", position: "relative" }}>

          {/* Context label — Patrick Hand #826a54 on #faf6ee = 4.71:1 WCAG AA */}
          <div style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: "0.95rem",
            color: "#826a54",
            marginBottom: "18px",
            lineHeight: 1.4,
          }}>
            {moodLabel} · {timeLabel} · {locLabel}
          </div>

          {/* Rec text — Lora italic #3d2e1e on #faf6ee = 12.12:1 WCAG AAA */}
          <p
            ref={textRef}
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(1.05rem, 2.4vw, 1.17rem)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#3d2e1e",
              lineHeight: 1.9,
              margin: "0 0 30px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {text}
          </p>

          {/* Buttons — sit above ruled lines */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", zIndex: 2 }}>

            {/* Primary — #5C3D28 on #EDD98A = 7.2:1 WCAG AAA */}
            <button
              onClick={onShuffle}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "#EDD98A",
                border: "1.5px solid #5C3D28",
                borderRadius: "2px",
                padding: "11px 22px",
                cursor: "pointer",
                fontFamily: "'Architects Daughter', cursive",
                fontSize: "14px",
                color: "#5C3D28",
                lineHeight: 1,
                boxShadow: "2px 2px 0px #5C3D28",
                transition: "background 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#D4923A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#EDD98A"; }}
            >
              <Shuffle size={13} strokeWidth={2} /> try another
            </button>

            {/* Secondary — #8C6848 on #faf6ee = 4.9:1 WCAG AA */}
            <button
              onClick={onReset}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "transparent",
                border: "1.5px solid #8C6848",
                borderRadius: "2px",
                padding: "11px 20px",
                cursor: "pointer",
                fontFamily: "'Architects Daughter', cursive",
                fontSize: "14px",
                color: "#8C6848",
                lineHeight: 1,
                transition: "border-color 0.2s ease, color 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#5C3D28";
                e.currentTarget.style.color = "#5C3D28";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#8C6848";
                e.currentTarget.style.color = "#8C6848";
              }}
            >
              <RotateCcw size={13} strokeWidth={2} /> start over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grain ────────────────────────────────────────────────────────────────────

function ColorBorder() {
  const stripe = {
    position: "fixed",
    left: 0,
    right: 0,
    height: "12px",
    zIndex: 50,
    pointerEvents: "none",
    background: "repeating-linear-gradient(90deg, #C4613A 0px, #C4613A 18px, #D4923A 18px, #D4923A 36px, #E8A882 36px, #E8A882 54px, #AABFA6 54px, #AABFA6 72px, #EDD98A 72px, #EDD98A 90px)",
  };
  return (
    <>
      <div style={{ ...stripe, top: 0 }} />
      <div style={{ ...stripe, bottom: 0 }} />
    </>
  );
}

function GrainOverlay() {
  return (
    <svg style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 100, opacity: 0.038,
    }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(null);
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [recIndex, setRecIndex] = useState(0);
  const [shuffling, setShuffling] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  function getPool() {
    if (!location || !mood || !time) return [];
    return recommendations[location]?.[mood]?.[time] || [];
  }

  function handleMoodSelect(id) {
    setMood(id);
    setTimeout(() => setStep(1), 320);
  }
  function handleTimeSelect(id) {
    setTime(id);
    setTimeout(() => setStep(2), 320);
  }
  function handleLocationSelect(id) {
    setLocation(id);
    const pool = recommendations[id]?.[mood]?.[time] || [];
    setRecIndex(Math.floor(Math.random() * pool.length));
    setTimeout(() => setStep(3), 400);
  }

  function handleShuffle() {
    setShuffling(true);
    setTimeout(() => {
      const pool = getPool();
      let next = recIndex;
      if (pool.length > 1) {
        while (next === recIndex) next = Math.floor(Math.random() * pool.length);
      }
      setRecIndex(next);
      setTimeout(() => setShuffling(false), 80);
    }, 420);
  }

  function handleReset() {
    setStep(0);
    setMood(null);
    setTime(null);
    setLocation(null);
    setRecIndex(0);
    setQuestionKey(k => k + 1);
  }

  const recText = getPool()[recIndex] || "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=Patrick+Hand&family=Architects+Daughter&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f2ead8; min-height: 100vh; font-family: 'Lora', Georgia, serif; }
        button { outline: none; }
        button:focus-visible { outline: 2px solid #7a6250; outline-offset: 3px; }
      `}</style>

      <ColorBorder />
      <GrainOverlay />

      <div style={{
        minHeight: "100vh",
        padding: "calc(clamp(32px, 6vw, 72px) + 12px) clamp(20px, 6vw, 72px) calc(clamp(32px, 6vw, 72px) + 12px)",
        maxWidth: "860px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Logo + subtext — always at top, fixed position in flow */}
        <div style={{ marginBottom: "clamp(36px, 7vw, 64px)", flexShrink: 0 }}>
          <h1 style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "clamp(3rem, 9vw, 4.8rem)",
            fontStyle: "italic",
            fontWeight: 600,
            color: "#3d2e1e",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}>
            Here.
          </h1>
          {/* Patrick Hand subtext — #826a54 on #f2ead8 = 4.5:1 WCAG AA */}
          <p style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            color: "#826a54",
            lineHeight: 1.4,
            margin: 0,
          }}>
            A nudge toward the humans around you.
          </p>
        </div>

        {/* Content area — centred vertically, biased upward with paddingBottom */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "20vh",
        }}>

        {step < 3 && (
          <div key={questionKey}>
            {step === 0 && (
              <QuestionBlock
                question="How are you feeling?"
                options={MOOD_OPTIONS}
                selected={mood}
                onSelect={handleMoodSelect}
              />
            )}
            {step === 1 && (
              <QuestionBlock
                question="How much time do you have?"
                options={TIME_OPTIONS}
                selected={time}
                onSelect={handleTimeSelect}
              />
            )}
            {step === 2 && (
              <QuestionBlock
                question="Where are you?"
                options={LOCATION_OPTIONS}
                selected={location}
                onSelect={handleLocationSelect}
              />
            )}
          </div>
        )}

        {step === 3 && (
          <RecommendationCard
            text={recText}
            mood={mood}
            time={time}
            location={location}
            onShuffle={handleShuffle}
            onReset={handleReset}
            shuffling={shuffling}
          />
        )}
        </div>
      </div>
    </>
  );
}