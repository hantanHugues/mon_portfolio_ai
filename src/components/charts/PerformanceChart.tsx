import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceData {
  week: string;
  projects: number;
  updates: number;
  goal: number;
}
interface PerformanceChartProps {
  data: PerformanceData[];
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  // Couleurs fixes qui fonctionnent en dark/light mode
  const colors = {
    projects: '#10b981',    // Emerald-500 - Nouveaux projets
    updates: '#3b82f6',     // Blue-500 - Mises à jour  
    goal: '#6b7280',        // Gray-500 - Objectif
  };

  // Calculer les totaux
  const totalProjects = data.reduce((sum, item) => sum + item.projects, 0);
  const totalUpdates = data.reduce((sum, item) => sum + item.updates, 0);
  const avgGoal = data.length > 0 ? data[0].goal : 0;

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const weekData = payload[0].payload;
      const weekTotal = weekData.projects + weekData.updates;
      const weekPerformance = weekTotal >= weekData.goal * 2 ? '🎯 Objectif atteint !' : '📈 En cours';
      
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold text-sm mb-2">{`Semaine ${label}`}</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.projects }}></div>
                <span>Nouveaux projets</span>
              </div>
              <span className="font-bold">{weekData.projects}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.updates }}></div>
                <span>Mises à jour</span>
              </div>
              <span className="font-bold">{weekData.updates}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.goal }}></div>
                <span>Objectif</span>
              </div>
              <span className="font-bold">{weekData.goal}</span>
            </div>
            <div className="pt-1 mt-2 border-t border-border">
              <span className="text-xs font-medium">{weekPerformance}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Métriques de performance */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{totalProjects}</div>
          <div className="text-xs text-emerald-700 dark:text-emerald-300">Projets créés</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{totalUpdates}</div>
          <div className="text-xs text-blue-700 dark:text-blue-300">Mises à jour</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800">
          <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{avgGoal * data.length}</div>
          <div className="text-xs text-gray-700 dark:text-gray-300">Objectif total</div>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis 
            dataKey="week" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="projects" 
            fill={colors.projects}
            radius={[4, 4, 0, 0]}
            name="Nouveaux projets"
          />
          <Bar 
            dataKey="updates" 
            fill={colors.updates}
            radius={[4, 4, 0, 0]}
            name="Mises à jour"
          />
          <Bar 
            dataKey="goal" 
            fill={colors.goal}
            radius={[4, 4, 0, 0]}
            opacity={0.4}
            name="Objectif"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
