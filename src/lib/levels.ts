export function getUserLevel(points: number) {
  if (points >= 10000) return { level: 5, title: "Pioneer", nextLevelPoints: null, progress: 100 };
  if (points >= 5000) return { level: 4, title: "Contributor", nextLevelPoints: 10000, progress: (points / 10000) * 100 };
  if (points >= 2000) return { level: 3, title: "Builder", nextLevelPoints: 5000, progress: (points / 5000) * 100 };
  if (points >= 500) return { level: 2, title: "Explorer", nextLevelPoints: 2000, progress: (points / 2000) * 100 };
  return { level: 1, title: "Newcomer", nextLevelPoints: 500, progress: (points / 500) * 100 };
}
