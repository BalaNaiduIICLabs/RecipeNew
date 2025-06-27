import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'recipePage/:idCategory',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();

        // Extract and return category IDs
        return data.categories.map((cat: any) => ({
          idCategory: cat.idCategory
        }));
      } catch (error) {
        console.error('Failed to fetch categories from TheMealDB:', error);
        return [];
      }
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
