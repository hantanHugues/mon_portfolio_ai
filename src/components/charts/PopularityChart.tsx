import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

interface PopularityData {
  date: string;
  visitors: number;
  contacts: number;
}

interface PopularityChartProps {
  data: PopularityData[];
}

export const PopularityChart = ({ data }: PopularityChartProps) => {
  // Couleurs fixes pour éviter les problèmes de thème
  const colors = {
    visitors: '#8b5cf6',    // Violet-500
    contacts: '#f59e0b',    // Amber-500
  };

  // Calculer les totaux pour les métriques
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalContacts = data.reduce((sum, item) => sum + item.contacts, 0);
  const avgVisitors = Math.round(totalVisitors / data.length);
  const avgContacts = Math.round(totalContacts / data.length);

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl">
          <h4 className="font-semibold text-sm mb-2">{`Date: ${label}`}</h4>
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium">
                  {entry.name}: <span className="font-bold">{entry.value}</span>
                  {entry.dataKey === 'visitors' && <span className="text-muted-foreground ml-1">visiteurs</span>}
                  {entry.dataKey === 'contacts' && <span className="text-muted-foreground ml-1">contacts</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Métriques en haut */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-violet-50 dark:bg-violet-950/20 rounded-lg p-4 border border-violet-200 dark:border-violet-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.visitors }}></div>
            <span className="text-sm font-medium text-muted-foreground">Visiteurs</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">{totalVisitors}</span>
            <span className="text-sm text-muted-foreground">total</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Moyenne: {avgVisitors}/jour
          </p>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.contacts }}></div>
            <span className="text-sm font-medium text-muted-foreground">Contacts</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalContacts}</span>
            <span className="text-sm text-muted-foreground">total</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Taux: {((totalContacts / totalVisitors) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Graphique amélioré */}
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.visitors} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={colors.visitors} stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="contactsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.contacts} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={colors.contacts} stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
          
          <XAxis 
            dataKey="date" 
            className="text-xs"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          
          <YAxis 
            className="text-xs"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="visitors"
            stroke={colors.visitors}
            strokeWidth={3}
            fill="url(#visitorsGradient)"
            name="Visiteurs Portfolio"
            dot={{ fill: colors.visitors, strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: colors.visitors, strokeWidth: 2, fill: '#ffffff' }}
          />
          
          <Area
            type="monotone"
            dataKey="contacts"
            stroke={colors.contacts}
            strokeWidth={3}
            fill="url(#contactsGradient)"
            name="Contacts Réseaux"
            dot={{ fill: colors.contacts, strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: colors.contacts, strokeWidth: 2, fill: '#ffffff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
