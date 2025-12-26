// Interfaz principal del CV
export interface CVData {
  cv: {
    name: string;
    label?: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    social_networks?: SocialNetwork[];
    sections?: {
      [key: string]: any;
    };
  };
}

// Red social
export interface SocialNetwork {
  network: string;
  username?: string;
  url?: string;
}

// Entrada de experiencia
export interface ExperienceEntry {
  company: string;
  position: string;
  start_date: string;
  end_date: string | 'present';
  location?: string;
  summary?: string;
  highlights?: string[];
}

// Entrada de educación
export interface EducationEntry {
  institution: string;
  area?: string;
  degree?: string;
  grade?: string;
  start_date: string;
  end_date: string | 'present';
  location?: string;
  summary?: string;
  highlights?: string[];
}

// Entrada de habilidades
export interface SkillEntry {
  label: string;
  details: string;
}

// Entrada de certificación
export interface CertificationEntry {
  title: string;
  institution?: string;
  date?: string;
  summary?: string;
}

// Entrada normal (proyectos, publicaciones, etc.)
export interface NormalEntry {
  name?: string;
  title?: string;
  institution?: string;
  company?: string;
  position?: string;
  start_date?: string;
  end_date?: string | 'present';
  date?: string;
  location?: string;
  summary?: string;
  highlights?: string[];
  skills?: string[];
}
