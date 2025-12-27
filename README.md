# Bambas Roda de Samba Website

A simple, modern website for Bambas Roda de Samba, a Brazilian samba band in Amsterdam.

## Setup

Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys your site when you push to the `main` or `master` branch.

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically build and deploy on every push

### Manual Deployment

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder contents to GitHub Pages:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose the branch and set the folder to `/dist`
   - **Important**: Make sure you're deploying the `dist` folder, NOT the source files

### Custom Domain Setup

If you're using a custom domain (bambasrodadesamba.com):

1. Add a `CNAME` file in the `public` folder with your domain name
2. Configure DNS settings as per GitHub Pages documentation
3. The `vite.config.js` is already set with `base: '/'` for custom domains

## Notes

- Add your band photo as `public/band-photo.jpg` to display on the home page
- The logo is already included at `logo.png` in the root directory
- **Important**: Always deploy the built `dist` folder, not the source files

