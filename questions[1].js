// © 2026 Fahad Najam Consulting
// questions.js — Scanner data layer

const PHASES = [
  {
    id: 'family',
    label: 'Family',
    color: '#5DCAA5',
    questions: [
      {
        id: 'q1',
        text: 'When you share good news, what happens to the energy in the room?',
        sub: '0 = it lifts, people celebrate fully. 10 = it gets heavier, questioned, or deflected.',
        low: 'Celebration',
        high: 'Probe'
      },
      {
        id: 'q2',
        text: 'How often do you filter what you share to manage their reaction?',
        sub: '0 = never, you\'re fully open. 10 = you calculate every word before speaking.',
        low: 'Full openness',
        high: 'Full filter'
      },
      {
        id: 'q3',
        text: 'Do past versions of you still define how they see you today?',
        sub: '0 = they see who you are now. 10 = they\'re still reacting to who you were years ago.',
        low: 'Present you',
        high: 'Old file'
      }
    ]
  },
  {
    id: 'relationship',
    label: 'Relationship',
    color: '#7F77DD',
    questions: [
      {
        id: 'q4',
        text: 'When you win, does your partner\'s response add energy or subtract it?',
        sub: '0 = always amplifies. 10 = consistently dims or questions.',
        low: 'Amplifies',
        high: 'Dims'
      },
      {
        id: 'q5',
        text: 'How much of your emotional processing happens alone because sharing feels unsafe?',
        sub: '0 = very little, partnership feels safe. 10 = almost all of it — you carry it privately.',
        low: 'Shared',
        high: 'Alone'
      },
      {
        id: 'q6',
        text: 'Does growth in your relationship feel mutual, or does one person\'s rise feel like a threat?',
        sub: '0 = fully mutual. 10 = your growth creates friction or distance.',
        low: 'Mutual rise',
        high: 'Zero-sum'
      }
    ]
  },
  {
    id: 'social',
    label: 'Society',
    color: '#D85A30',
    questions: [
      {
        id: 'q7',
        text: 'How much does the fear of what people will think shape your daily decisions?',
        sub: '0 = almost never. 10 = it\'s running in the background of almost everything.',
        low: 'Free',
        high: 'Monitored'
      },
      {
        id: 'q8',
        text: 'Do you feel like your life path was chosen, or assigned by the system around you?',
        sub: '0 = fully chosen. 10 = it was written before you could read.',
        low: 'Authored',
        high: 'Assigned'
      },
      {
        id: 'q9',
        text: 'How often do you edit your authentic self to fit a room, a job, or an expectation?',
        sub: '0 = rarely, you show up whole. 10 = constantly, different mask per context.',
        low: 'Whole',
        high: 'Masked'
      }
    ]
  },
  {
    id: 'internal',
    label: 'Internal',
    color: '#378ADD',
    questions: [
      {
        id: 'q10',
        text: 'How quickly does the inner critic fire when something good happens?',
        sub: '0 = not at all, you receive it. 10 = immediately, before you can enjoy it.',
        low: 'Open',
        high: 'Immediate critic'
      },
      {
        id: 'q11',
        text: 'Can you sit in your own progress without needing someone else to validate it?',
        sub: '0 = fully, you\'re your own witness. 10 = it doesn\'t feel real until someone confirms it.',
        low: 'Self-anchored',
        high: 'Validation-dependent'
      },
      {
        id: 'q12',
        text: 'How much energy do you spend explaining yourself to people who weren\'t asking?',
        sub: '0 = none, you\'ve stopped over-explaining. 10 = it\'s almost compulsive.',
        low: 'Silent',
        high: 'Over-explaining'
      }
    ]
  }
];

const TIERS = [
  {
    max: 25,
    label: 'Clear signal',
    desc: 'Most contracts have been renegotiated. You operate with high autonomy. The noise is low — not because life is easy, but because you\'ve done the work of separating what\'s yours from what was handed to you.'
  },
  {
    max: 45,
    label: 'Some drag',
    desc: 'You\'ve done real work here. Some legacy contracts still run in the background — not controlling, but costing energy. The awareness you already have is the tool. Keep naming what you find.'
  },
  {
    max: 65,
    label: 'Significant pull',
    desc: 'The system has real gravity on you right now. That\'s not failure — that\'s honesty. Awareness is already half the exit. You\'re not stuck. You\'re waking up inside a system that assumed you wouldn\'t.'
  },
  {
    max: 80,
    label: 'Deep entanglement',
    desc: 'Multiple layers are pulling against your growth simultaneously. This is survivable and more common than anyone admits. Each layer you name stops running on autopilot. That\'s where the energy comes back from.'
  },
  {
    max: 100,
    label: 'Maximum gravity',
    desc: 'The system is very loud right now. But the fact that you\'re here — measuring it, being honest with yourself — that\'s already movement. Every identified contract is one you can consciously choose to stop executing.'
  }
];

const INSIGHTS = {
  family: {
    icon: '⬡',
    title: 'Family contracts',
    body: 'These were written before you could sign them. Renegotiating them is not disloyalty — it\'s becoming an adult in your own story. The people who wrote them were also running inherited code.'
  },
  relationship: {
    icon: '◎',
    title: 'Intimate mirror',
    body: 'A partner who can\'t celebrate your wins isn\'t necessarily bad — they may be running a contract that says your rise is their loss. The question is whether that contract can update, or whether it\'s load-bearing to the whole structure.'
  },
  social: {
    icon: '△',
    title: 'Cultural conditioning',
    body: 'The mortgage, the correct timeline, the acceptable path — these are suggestions wearing the mask of requirements. Sophisticated conditioning doesn\'t feel like control. It feels like common sense.'
  },
  internal: {
    icon: '◇',
    title: 'Inner architecture',
    body: 'The inner critic is the system\'s last line of defense. It went internal so it wouldn\'t need external enforcement anymore. Naming it is different from obeying it.'
  },
  freedom_high: {
    icon: '→',
    title: 'Energy available',
    body: 'More than half your signal is clear. This is the ground to build from. Momentum compounds on free territory — the work you do here costs less and lands further.'
  },
  freedom_low: {
    icon: '→',
    title: 'Signal under noise',
    body: 'The signal is still there. It never disappeared. Naming each layer turns the volume down, one contract at a time. You don\'t have to solve the whole system — just the next visible node.'
  }
};
