import { find } from 'lodash';
// @types
import { Rule } from '../@types/availability';
// _apis_/intervals.ts

/**
 * @description
 * @param rules
 * @returns
 */
export function updateRule(rules: Rule[], index: number, newRule: Rule) {
  const deleteOldRule = rules.filter((rule: Rule) => rule.dayId !== newRule.dayId);

  return [...deleteOldRule, newRule];
}

/**
 * @description
 * @param rules
 * @returns
 */
export function createRule(rules: Rule[], index: number, dayId: string) {
  const defaultInterval = {
    from: '06:00',
    to: '06:30'
  };

  return [
    ...rules,
    {
      dayId,
      intervals: [defaultInterval]
    }
  ];
}

/**
 * @description
 * @param rules
 * @returns
 */
export function deleteRule(rules: Rule[], dayId: string) {
  return rules.filter((rule: Rule) => rule.dayId !== dayId);
}

/**
 * @description
 * @param rules
 * @returns
 */
export function getRule(rules: Rule[], dayId: string): Rule | null {
  const rule = find(rules, (rule: Rule) => rule.dayId === dayId);

  if (!rule) {
    return null;
  }

  return rule;
}
