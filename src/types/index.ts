export type Edition = 'US' | 'INTERNATIONAL' | 'CANADA' | 'ESPANOL' | 'CHINESE';

export type SectionType = 
  | 'All'
  | 'World' 
  | 'U.S.' 
  | 'Politics' 
  | 'Business' 
  | 'Tech' 
  | 'Science' 
  | 'Arts' 
  | 'Lifestyle' 
  | 'Opinion' 
  | 'Audio' 
  | 'Games' 
  | 'Cooking' 
  | 'Wirecutter' 
  | 'The Athletic';

export interface Article {
  id: string;
  category: string;
  isBreaking?: boolean;
  isAnalysis?: boolean;
  isLiveUpdate?: boolean;
  isGreatRead?: boolean;
  isOpinion?: boolean;
  isSports?: boolean;
  title: string;
  subtitle?: string;
  deck: string;
  author: string;
  authorRole?: string;
  readTime: string;
  publishedAt: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  content: string[];
  audioMinutes?: number;
  commentsCount?: number;
  tags?: string[];
  comments?: Array<{
    id: string;
    author: string;
    location: string;
    text: string;
    timestamp: string;
    likes: number;
  }>;
}

export interface Recipe {
  id: string;
  title: string;
  author: string;
  deck: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  ingredients: { amount: string; item: string }[];
  instructions: { step: number; title: string; text: string; timerMinutes?: number }[];
  nutrition: { calories: number; fat: string; protein: string; carbs: string };
  chefsNote: string;
}

export type ViewState = 
  | { type: 'frontpage' }
  | { type: 'article'; articleId: string }
  | { type: 'recipe'; recipeId: string }
  | { type: 'todays_paper' }
  | { type: 'wordle' }
  | { type: 'connections' }
  | { type: 'mini_crossword' };
