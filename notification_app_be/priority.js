import { normalizeType, clampLimit, byDateDesc } from './helpers/notificationHelpers.js';

const TYPE_WEIGHTS = {
  placement: 3,
  result: 2,
  event: 1,
};

export function getPriorityWeight(type) {
  return TYPE_WEIGHTS[normalizeType(type)] || 0;
}

export function sortByPriority(notifications = []) {
  return [...notifications].sort((a, b) => {
    const diff = getPriorityWeight(b.type) - getPriorityWeight(a.type);
    if (diff !== 0) return diff;
    return byDateDesc(a, b);
  });
}

export function getTopPriorityNotifications(notifications = [], limit = 10) {
  return sortByPriority(notifications).slice(0, clampLimit(limit, 10));
}

export { TYPE_WEIGHTS };
