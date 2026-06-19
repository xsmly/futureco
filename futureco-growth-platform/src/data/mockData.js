// FutureCo Growth Platform - Mock Data Layer
// Mars Habitat 2035 - Sol 61

export const userData = {
  id: 'alex-morgan-001',
  name: 'Alex Morgan',
  role: 'Habitat Operations Engineer',
  department: 'Systems Engineering',
  habitat: 'Valles Marineris Station Alpha',
  sol: 61,
  earthConnectionDelay: '14 min 22 sec',
  localTime: '08:34 MST',
  avatar: 'AM',
};

export const managerData = {
  id: 'elena-reyes-001',
  name: 'Dr. Elena Reyes',
  role: 'Chief Engineer',
  avatar: 'ER',
  nextMeetingSol: 62,
  nextMeetingTime: '10:30 MST',
};

export const peersData = [
  {
    id: 'morgan-lee-001',
    name: 'Morgan Lee',
    role: 'EVA Systems Lead',
    matchReason: 'Shares experience with zero-G decompression protocols. Previously mentored three peers on pressure suit diagnostics.',
    avatar: 'ML',
    sharedSkills: ['EVA Suit Diagnostics', 'Airlock Safety Protocols'],
  },
  {
    id: 'priya-nandakumar-001',
    name: 'Priya Nandakumar',
    role: 'Hydroponics Yield Specialist',
    matchReason: 'Expert in critical resource rationing with complementary sensor calibration skills. Has published internal briefs on water reclamation.',
    avatar: 'PN',
    sharedSkills: ['Resource Rationing', 'Sensor Calibration'],
  },
];

export const skillsData = [
  {
    id: 'life-support-diagnostics',
    name: 'Life Support System Diagnostics',
    category: 'priority',
    currentProficiency: 72,
    targetProficiency: 90,
    priority: 1,
    rationale: 'Your recent O2 Scrubber Analysis demonstrated strong data collection but was flagged for slow diagnostic routing. Three sector leads noted they needed faster alert resolution. This skill directly impacts habitat survivability.',
    source: 'O2 Scrubber Analysis - Sol 58',
    lastActivity: 'Sol 58',
  },
  {
    id: 'regolith-extraction',
    name: 'Regolith Extraction Protocol',
    category: 'priority',
    currentProficiency: 45,
    targetProficiency: 80,
    priority: 2,
    rationale: 'The Rover Maintenance Review revealed gaps in regolith handling during dust storm conditions. As Sol 90 heavy excavation drills approach, building this capability is time-critical.',
    source: 'Rover Maintenance Review - Sol 52',
    lastActivity: 'Sol 55',
  },
  {
    id: 'airlock-decompression',
    name: 'Airlock Decompression Management',
    category: 'build',
    currentProficiency: 58,
    targetProficiency: 75,
    priority: 3,
    rationale: 'EVA peer evaluations indicate your depressurization sequences are safe but lack optimized speed. The upcoming external habitat repair cycle on Sol 75 is an opportunity to practice this skill.',
    source: 'EVA Peer Review Cycle - Sol 45',
    lastActivity: 'Sol 50',
  },
  {
    id: 'solar-array-alignment',
    name: 'Solar Array Alignment Optimization',
    category: 'build',
    currentProficiency: 63,
    targetProficiency: 80,
    priority: 4,
    rationale: 'Your tracking algorithms show strong baseline competency. Building toward 80% will qualify you for the main energy grid management cohort starting Sol 100.',
    source: 'Energy Grid Module Completion - Sol 40',
    lastActivity: 'Sol 48',
  },
  {
    id: 'zero-g-first-aid',
    name: 'Zero-G First Aid & Triage',
    category: 'maintain',
    currentProficiency: 81,
    targetProficiency: 85,
    priority: 5,
    rationale: 'Consistently demonstrated in quarterly medical drills. Maintain current trajectory through ongoing practice.',
    source: 'Medical Drill Assessment - Sol 35',
    lastActivity: 'Sol 44',
  },
];

export const workEvidenceData = [
  {
    id: 'evidence-001',
    title: 'Rover Maintenance Review',
    type: 'Hardware Diagnostics',
    sol: 52,
    skills: [
      {
        skillId: 'regolith-extraction',
        skillName: 'Regolith Extraction Protocol',
        confidence: 71,
        status: 'verified',
        method: 'AI inference from telemetry logs and mechanical repair timelines',
      },
    ],
    description: 'Comprehensive review of the extraction rover after Sector 4 dust storm. Identified three filter degradation points in the regolith intake sequence.',
  },
  {
    id: 'evidence-002',
    title: 'O2 Scrubber Analysis',
    type: 'Systems Report',
    sol: 58,
    skills: [
      {
        skillId: 'life-support-diagnostics',
        skillName: 'Life Support System Diagnostics',
        confidence: 68,
        status: 'verified',
        method: 'AI analysis of system reset codes, diagnostic timelines, and alert resolution',
      },
      {
        skillId: 'solar-array-alignment',
        skillName: 'Solar Array Alignment Optimization',
        confidence: 74,
        status: 'verified',
        method: 'Pattern matching against power draw fluctuations during scrubber reset',
      },
    ],
    description: 'Data-driven brief on atmospheric recycling capacity for Sol 60-90 operations window. Presented to engineering leads with power allocation recommendations.',
  },
  {
    id: 'evidence-003',
    title: 'EVA Debrief Notes',
    type: 'Mission Documentation',
    sol: 55,
    skills: [
      {
        skillId: 'airlock-decompression',
        skillName: 'Airlock Decompression Management',
        confidence: 55,
        status: 'pending',
        method: 'Inferred from airlock pressure logs and crew biometric telemetry',
      },
    ],
    description: 'Documentation from post-repair EVA debrief. Three crew members noted slower-than-average repressurization times.',
  },
];

export const learningModules = [
  {
    id: 'learning-001',
    title: 'Emergency Depressurization Protocols',
    duration: '12 min',
    type: 'Interactive Scenario',
    status: 'active',
    connectedSkill: 'airlock-decompression',
    connectedTask: 'External Habitat Repair - Sol 75',
    progress: 35,
    scenario: {
      question: 'During a routine EVA prep, the inner airlock door sensor indicates a micro-fracture seal failure while the outer door is cycling. The cabin pressure begins dropping at 0.5 PSI per second. What is your immediate action?',
      options: [
        {
          id: 'a',
          text: 'Override the outer door cycle to force it closed and attempt to manually patch the inner seal.',
          isCorrect: false,
          feedback: 'Overriding the outer door cycle during operation can cause a hard jam, trapping the EVA crew in the airlock while the cabin continues to depressurize.',
        },
        {
          id: 'b',
          text: 'Hit the Emergency Abort switch to instantly halt the cycle, seal the inner secondary blast door, and route emergency O2 to the main cabin.',
          isCorrect: true,
          feedback: 'Excellent. Sealing the secondary blast door contains the atmospheric loss immediately, and halting the cycle prevents equipment damage. Routing emergency O2 stabilizes the crew environment.',
        },
        {
          id: 'c',
          text: 'Instruct the EVA crew to expedite their exit and close the outer door behind them, then focus on the inner seal.',
          isCorrect: false,
          feedback: 'This exposes the EVA crew to an uncontrolled depressurization event and risks catastrophic failure of the inner airlock mechanisms.',
        },
      ],
    },
  },
  {
    id: 'learning-002',
    title: 'Filter Calibration for High-Silica Dust',
    duration: '8 min',
    type: 'Micro-lesson',
    status: 'queued',
    connectedSkill: 'life-support-diagnostics',
    connectedTask: 'O2 Scrubber updates',
    progress: 0,
  },
  {
    id: 'learning-003',
    title: 'Rover Triage in Zero Visibility',
    duration: '15 min',
    type: 'Simulation',
    status: 'queued',
    connectedSkill: 'regolith-extraction',
    connectedTask: 'Sol 90 Heavy Excavation Drill',
    progress: 0,
  },
];

export const confidenceQuestions = [
  {
    id: 'q1',
    text: 'I feel confident in my ability to handle emergency hardware failures at the habitat.',
    category: 'Role Confidence',
  },
  {
    id: 'q2',
    text: 'I have clear visibility into what engineering skills I need to develop next.',
    category: 'Development Clarity',
  },
  {
    id: 'q3',
    text: 'I feel supported by my Chief Engineer and crew members in my technical growth.',
    category: 'Support Quality',
  },
  {
    id: 'q4',
    text: 'The telemetry feedback I receive helps me improve my mission performance in meaningful ways.',
    category: 'Feedback Utility',
  },
];

export const confidenceLabels = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export const milestoneData = {
  id: 'milestone-001',
  title: 'Crisis Hardware Resolution',
  sol: 61,
  description: 'Demonstrated measurable engineering skill development during the high-intensity Sol 50-60 operations window.',
  evidence: [
    'Completed O2 Scrubber Analysis with cross-system telemetry integration',
    'Received positive crew feedback on safe EVA decompression protocols',
    'Maintained learning engagement during elevated dust storm alerts',
    'Proactively identified filter degradation points in rover maintenance',
  ],
  sharing: 'private',
};

export const privacyCategories = [
  { id: 'growth-roadmap', label: 'Growth Roadmap & Priorities', visibility: 'manager' },
  { id: 'skill-proficiency', label: 'Skill Proficiency Scores', visibility: 'manager' },
  { id: 'work-evidence', label: 'Work Evidence & Inferences', visibility: 'manager' },
  { id: 'learning-progress', label: 'Learning Progress', visibility: 'alex-only' },
  { id: 'confidence-scores', label: 'Career Confidence Scores', visibility: 'alex-only' },
  { id: 'recognition', label: 'Recognition & Milestones', visibility: 'alex-only' },
  { id: 'peer-connections', label: 'Peer Support Connections', visibility: 'alex-only' },
  { id: 'meeting-prep', label: 'Manager Meeting Prep Notes', visibility: 'alex-only' },
];

export const visibilityOptions = [
  { value: 'alex-only', label: 'Alex Only' },
  { value: 'manager', label: 'Manager' },
  { value: 'habitat-hr', label: 'Habitat Command' },
];

export const chatbotResponses = {
  'priority': {
    trigger: ['why is life support', 'highest priority', 'why life support', 'top priority', 'why is life support diagnostics'],
    response: 'Life Support System Diagnostics is your highest priority because your recent O2 Scrubber Analysis (Sol 58) demonstrated strong data collection but was flagged for slow diagnostic routing. Three sector leads noted they needed faster alert resolution. Improving this skill directly impacts habitat survivability and is critical for the Sol 75 mission cycle.',
    actions: [],
  },
  'reorder': {
    trigger: ['move life support', 'reorder', 'above regolith', 'swap priorities', 'move life support above'],
    response: 'Done. I\'ve moved Life Support System Diagnostics above Regolith Extraction Protocol in your growth roadmap. Your updated priority order is now reflected across all views.',
    actions: ['reorder-skills'],
  },
  'manager-prep': {
    trigger: ['prepare for', 'manager conversation', 'discussion brief', 'meeting with elena', 'prep for manager'],
    response: 'I\'ve generated a discussion brief for your upcoming conversation with Dr. Elena Reyes on Sol 62 at 10:30 MST. The brief covers your current engineering priority areas, recent mission evidence, and suggested talking points. You can review it in the Support section.',
    actions: ['generate-brief'],
  },
  'peer-swap': {
    trigger: ['find another peer', 'different peer', 'another peer', 'swap peer', 'find peer'],
    response: 'I\'ve found Priya Nandakumar, Hydroponics Yield Specialist, as an alternative peer match. Priya has complementary experience in critical resource rationing and sensor calibration. You can view her profile in the Support section.',
    actions: ['swap-peer'],
  },
  'reduce-learning': {
    trigger: ['reduce', 'learning load', 'pause learning', 'fewer modules', 'reduce my learning'],
    response: 'Done. I\'ve paused all non-essential learning modules for 5 sols (until Sol 66). Only your active module "Emergency Depressurization Protocols" remains available. This will not impact your performance records or safety certifications.',
    actions: ['pause-learning'],
  },
  'evidence': {
    trigger: ['evidence behind', 'show evidence', 'regolith extraction evidence', 'how was extraction', 'evidence for regolith'],
    response: 'The Regolith Extraction Protocol skill inference (71% confidence) is derived from your Rover Maintenance Review (Sol 52). The AI analyzed: (1) Telemetry logs showing mechanical repair timelines, (2) Identification of three filter degradation points, and (3) Pattern matching against the excavation competency framework. If you disagree with this inference, you can request a human review.',
    actions: [],
  },
  'dispute': {
    trigger: ['request human review', 'dispute', 'review regolith', 'challenge inference', 'request review'],
    response: 'Your request for human review of Regolith Extraction Protocol has been submitted. The skill status has been changed to "Human review requested" and flagged for Dr. Elena Reyes in the Manager Review Portal. You\'ll be notified when a decision is made.',
    actions: ['dispute-skill'],
  },
  'share-milestone': {
    trigger: ['share', 'milestone', 'share with manager', 'share latest milestone'],
    response: 'Your "Crisis Hardware Resolution" milestone has been updated to "Share with manager only." Dr. Elena Reyes will be able to see this achievement in her review portal. Your privacy settings have been updated accordingly.',
    actions: ['share-milestone'],
  },
  'privacy-info': {
    trigger: ['what can my manager see', 'privacy', 'what information', 'manager access', 'what does elena see'],
    response: 'Currently, Dr. Elena Reyes can see:\n- Your Growth Roadmap & Priorities\n- Skill Proficiency Scores\n- Work Evidence & Inferences\n\nShe cannot see:\n- Learning Progress\n- Career Confidence Scores\n- Recognition & Milestones (unless you choose to share)\n- Peer Support Connections\n- Manager Meeting Prep Notes\n\nYou can adjust these settings anytime in Privacy & Controls.',
    actions: [],
  },
  'confidence': {
    trigger: ['start my confidence', 'confidence check', 'check-in', 'career confidence'],
    response: 'I\'ll take you to your Career Confidence Check-In now. This is a brief 4-question reflection on your development experience. Your responses are private by default.',
    actions: ['navigate-checkin'],
  },
  'greeting': {
    trigger: ['hello', 'hi', 'hey', 'good morning', 'help'],
    response: 'Welcome, Alex. I\'m your FutureCo Development Assistant for Sol 61. I can help you understand your engineering priorities, prepare for crew conversations, manage your learning load, or review mission evidence. What would you like to explore?',
    actions: [],
  },
};

export const suggestedPrompts = [
  'Why is Life Support Diagnostics my highest priority?',
  'Help me prepare for my manager conversation.',
  'Show the evidence behind Regolith Extraction.',
  'Reduce my learning load for five sols.',
  'What information can my manager see?',
];

export const recentActivity = [
  { id: 'act-1', text: 'O2 Scrubber Analysis submitted for review', sol: 58, type: 'evidence' },
  { id: 'act-2', text: 'Life Support Diagnostics proficiency updated to 72%', sol: 58, type: 'skill' },
  { id: 'act-3', text: 'EVA debrief session documented', sol: 55, type: 'feedback' },
  { id: 'act-4', text: 'Filter gap identified in rover maintenance review', sol: 52, type: 'insight' },
  { id: 'act-5', text: 'Learning module "Emergency Depressurization" started', sol: 50, type: 'learning' },
];

export const talkingPoints = [
  'Review progress on Life Support Diagnostics - discuss diagnostic routing improvements from O2 Scrubber Analysis feedback',
  'Alignment on Regolith Extraction development timeline ahead of Sol 90 heavy excavation drills',
  'Request for additional peer mentorship opportunities in zero-G protocols',
  'Discussion of learning load balance during elevated dust storm alerts',
  'Confidence check-in results and technical support needs',
];
