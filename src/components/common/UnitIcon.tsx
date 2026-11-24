import {
  BarChart3,
  Briefcase,
  Building2,
  Cpu,
  Headphones,
  ShieldCheck,
  Users,
  Wrench
} from 'lucide-react';
import type { UnitIconKey } from '../../types/vocab';

interface UnitIconProps {
  iconKey: UnitIconKey;
  className?: string;
}

export function UnitIcon({ iconKey, className = 'w-5 h-5' }: UnitIconProps) {
  switch (iconKey) {
    case 'building':
      return <Building2 className={className} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={className} aria-hidden="true" />;
    case 'wrench':
      return <Wrench className={className} aria-hidden="true" />;
    case 'shield-check':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'headphones':
      return <Headphones className={className} aria-hidden="true" />;
    case 'bar-chart':
      return <BarChart3 className={className} aria-hidden="true" />;
    case 'briefcase':
      return <Briefcase className={className} aria-hidden="true" />;
    case 'users':
      return <Users className={className} aria-hidden="true" />;
  }
}
