import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  userData,
  managerData,
  peersData,
  skillsData,
  workEvidenceData,
  learningModules,
  milestoneData,
  privacyCategories,
  recentActivity,
  talkingPoints,
  chatbotResponses,
  suggestedPrompts,
  confidenceQuestions,
  confidenceLabels,
  visibilityOptions,
} from '../data/mockData';

export const AppContext = createContext(null);

const STORAGE_KEY = 'futureco-growth-state';

function loadPersistedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // ignore
  }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

export function AppProvider({ children }) {
  const persisted = loadPersistedState();

  const [currentPage, setCurrentPage] = useState(persisted?.currentPage || 'overview');
  const [viewMode, setViewMode] = useState(persisted?.viewMode || 'alex'); // 'alex' | 'manager'
  const [skills, setSkills] = useState(persisted?.skills || [...skillsData]);
  const [evidence, setEvidence] = useState(persisted?.evidence || [...workEvidenceData]);
  const [learning, setLearning] = useState(persisted?.learning || [...learningModules]);
  const [learningPaused, setLearningPaused] = useState(persisted?.learningPaused || false);
  const [learningPausedUntilSol, setLearningPausedUntilSol] = useState(persisted?.learningPausedUntilSol || null);
  const [milestone, setMilestone] = useState(persisted?.milestone || { ...milestoneData });
  const [privacy, setPrivacy] = useState(persisted?.privacy || [...privacyCategories]);
  const [confidenceResponses, setConfidenceResponses] = useState(persisted?.confidenceResponses || {});
  const [confidenceCompleted, setConfidenceCompleted] = useState(persisted?.confidenceCompleted || false);
  const [confidencePrivacy, setConfidencePrivacy] = useState(persisted?.confidencePrivacy || 'alex-only');
  const [chatMessages, setChatMessages] = useState(persisted?.chatMessages || []);
  const [chatOpen, setChatOpen] = useState(false);
  const [briefGenerated, setBriefGenerated] = useState(persisted?.briefGenerated || false);
  const [activePeerIndex, setActivePeerIndex] = useState(persisted?.activePeerIndex || 0);
  const [scenarioAnswered, setScenarioAnswered] = useState(persisted?.scenarioAnswered || null);
  const [supportSignalDismissed, setSupportSignalDismissed] = useState(persisted?.supportSignalDismissed || false);
  const [drawerOpen, setDrawerOpen] = useState(null); // { type, data }
  const [isAuthenticated, setIsAuthenticated] = useState(persisted?.isAuthenticated || false);

  // Persist state changes
  useEffect(() => {
    const stateToSave = {
      currentPage,
      viewMode,
      skills,
      evidence,
      learning,
      learningPaused,
      learningPausedUntilSol,
      milestone,
      privacy,
      confidenceResponses,
      confidenceCompleted,
      confidencePrivacy,
      chatMessages,
      briefGenerated,
      activePeerIndex,
      scenarioAnswered,
      supportSignalDismissed,
      isAuthenticated,
    };
    saveState(stateToSave);
  }, [currentPage, viewMode, skills, evidence, learning, learningPaused, learningPausedUntilSol,
    milestone, privacy, confidenceResponses, confidenceCompleted, confidencePrivacy, chatMessages,
    briefGenerated, activePeerIndex, scenarioAnswered, supportSignalDismissed, isAuthenticated]);

  // === ACTION FUNCTIONS ===

  const reorderSkills = useCallback((fromIndex, toIndex) => {
    setSkills(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated.map((s, i) => ({ ...s, priority: i + 1 }));
    });
  }, []);

  const moveSkillUp = useCallback((skillId) => {
    setSkills(prev => {
      const idx = prev.findIndex(s => s.id === skillId);
      if (idx <= 0) return prev;
      const updated = [...prev];
      [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
      return updated.map((s, i) => ({ ...s, priority: i + 1 }));
    });
  }, []);

  const moveSkillDown = useCallback((skillId) => {
    setSkills(prev => {
      const idx = prev.findIndex(s => s.id === skillId);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const updated = [...prev];
      [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
      return updated.map((s, i) => ({ ...s, priority: i + 1 }));
    });
  }, []);

  const disputeSkill = useCallback((evidenceId, skillId) => {
    setEvidence(prev =>
      prev.map(ev =>
        ev.id === evidenceId
          ? {
              ...ev,
              skills: ev.skills.map(sk =>
                sk.skillId === skillId
                  ? { ...sk, status: 'disputed' }
                  : sk
              ),
            }
          : ev
      )
    );
  }, []);

  const resolveDispute = useCallback((evidenceId, skillId, resolution) => {
    setEvidence(prev =>
      prev.map(ev =>
        ev.id === evidenceId
          ? {
              ...ev,
              skills: ev.skills.map(sk =>
                sk.skillId === skillId
                  ? {
                      ...sk,
                      status: resolution === 'reject' ? 'rejected' : 'verified',
                      confidence: resolution === 'lower' ? Math.max(sk.confidence - 15, 30) : sk.confidence,
                      resolutionNote: resolution === 'reject'
                        ? 'Inference rejected by manager review'
                        : 'Confirmed at adjusted proficiency by manager',
                    }
                  : sk
              ),
            }
          : ev
      )
    );
  }, []);

  const pauseLearning = useCallback(() => {
    setLearningPaused(true);
    setLearningPausedUntilSol(userData.sol + 5);
    setLearning(prev =>
      prev.map(m =>
        m.status === 'queued' ? { ...m, status: 'paused' } : m
      )
    );
  }, []);

  const resumeLearning = useCallback(() => {
    setLearningPaused(false);
    setLearningPausedUntilSol(null);
    setLearning(prev =>
      prev.map(m =>
        m.status === 'paused' ? { ...m, status: 'queued' } : m
      )
    );
  }, []);

  const updateMilestoneSharing = useCallback((sharing) => {
    setMilestone(prev => ({ ...prev, sharing }));
    // Also update privacy state
    setPrivacy(prev =>
      prev.map(p =>
        p.id === 'recognition'
          ? { ...p, visibility: sharing === 'private' ? 'alex-only' : sharing === 'manager-only' ? 'manager' : 'habitat-hr' }
          : p
      )
    );
  }, []);

  const updatePrivacy = useCallback((categoryId, visibility) => {
    setPrivacy(prev =>
      prev.map(p =>
        p.id === categoryId ? { ...p, visibility } : p
      )
    );
  }, []);

  const swapDataStoryCrisis = useCallback(() => {
    setSkills(prev => {
      const dsIdx = prev.findIndex(s => s.id === 'data-storytelling');
      const ccIdx = prev.findIndex(s => s.id === 'crisis-coordination');
      if (dsIdx < 0 || ccIdx < 0) return prev;
      // Make sure data storytelling is above crisis coordination
      if (dsIdx > ccIdx) {
        const updated = [...prev];
        [updated[dsIdx], updated[ccIdx]] = [updated[ccIdx], updated[dsIdx]];
        return updated.map((s, i) => ({ ...s, priority: i + 1 }));
      }
      return prev;
    });
  }, []);

  // Chatbot intent engine
  const processMessage = useCallback((userMessage) => {
    const lower = userMessage.toLowerCase().trim();

    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage, timestamp: Date.now() }]);

    // Match intent
    let matched = null;
    for (const [key, config] of Object.entries(chatbotResponses)) {
      if (config.trigger.some(t => lower.includes(t))) {
        matched = { key, ...config };
        break;
      }
    }

    if (!matched) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: 'I understand you\'re asking about your development. I can help with priorities, learning, evidence, manager prep, peer support, privacy, and confidence check-ins. Could you try rephrasing your question?',
        timestamp: Date.now(),
      }]);
      return;
    }

    // Execute actions
    matched.actions.forEach(action => {
      switch (action) {
        case 'reorder-skills':
          swapDataStoryCrisis();
          break;
        case 'generate-brief':
          setBriefGenerated(true);
          break;
        case 'swap-peer':
          setActivePeerIndex(1);
          break;
        case 'pause-learning':
          pauseLearning();
          break;
        case 'dispute-skill':
          disputeSkill('evidence-001', 'crisis-coordination');
          break;
        case 'share-milestone':
          updateMilestoneSharing('manager-only');
          break;
        case 'navigate-checkin':
          setTimeout(() => setCurrentPage('checkin'), 500);
          break;
      }
    });

    // Add bot response
    setChatMessages(prev => [...prev, {
      role: 'assistant',
      text: matched.response,
      timestamp: Date.now(),
    }]);
  }, [swapDataStoryCrisis, pauseLearning, disputeSkill, updateMilestoneSharing]);

  const resetPresentation = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }, []);

  const contextValue = useMemo(() => ({
    // Static data
    user: userData,
    manager: managerData,
    peers: peersData,
    recentActivity,
    talkingPoints,
    suggestedPrompts,
    confidenceQuestions,
    confidenceLabels,
    visibilityOptions,

    // Dynamic state
    currentPage, setCurrentPage,
    viewMode, setViewMode,
    skills, setSkills,
    evidence, setEvidence,
    learning, setLearning,
    learningPaused,
    learningPausedUntilSol,
    milestone, setMilestone,
    privacy, setPrivacy,
    confidenceResponses, setConfidenceResponses,
    confidenceCompleted, setConfidenceCompleted,
    confidencePrivacy, setConfidencePrivacy,
    chatMessages, setChatMessages,
    chatOpen, setChatOpen,
    briefGenerated, setBriefGenerated,
    activePeerIndex, setActivePeerIndex,
    scenarioAnswered, setScenarioAnswered,
    supportSignalDismissed, setSupportSignalDismissed,
    drawerOpen, setDrawerOpen,
    isAuthenticated, setIsAuthenticated,

    // Actions
    reorderSkills,
    moveSkillUp,
    moveSkillDown,
    disputeSkill,
    resolveDispute,
    pauseLearning,
    resumeLearning,
    updateMilestoneSharing,
    updatePrivacy,
    processMessage,
    resetPresentation,
  }), [
    currentPage, viewMode, skills, evidence, learning, learningPaused, learningPausedUntilSol,
    milestone, privacy, confidenceResponses, confidenceCompleted, confidencePrivacy,
    chatMessages, chatOpen, briefGenerated, activePeerIndex, scenarioAnswered, supportSignalDismissed,
    drawerOpen, reorderSkills, moveSkillUp, moveSkillDown, disputeSkill, resolveDispute,
    pauseLearning, resumeLearning, updateMilestoneSharing, updatePrivacy, processMessage, resetPresentation,
    isAuthenticated,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
