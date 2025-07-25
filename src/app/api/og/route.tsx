import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
 try {
   const { searchParams } = new URL(request.url)
   
   // Paramètres de l'image
   const title = searchParams.get('title') || 'Candi Tracker'
   const description = searchParams.get('description') || 'Suivi de candidatures intelligent'
   const type = searchParams.get('type') || 'default' // default, blog, feature, pricing
   
   // Couleurs selon le type
   const themes = {
     default: {
       bg: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
       accent: '#60a5fa'
     },
     blog: {
       bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
       accent: '#34d399'
     },
     feature: {
       bg: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
       accent: '#a78bfa'
     },
     pricing: {
       bg: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
       accent: '#f87171'
     }
   }
   
   const theme = themes[type as keyof typeof themes] || themes.default

   // Récupération de la police
   const fontData = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap')
     .then((res) => res.arrayBuffer())

   return new ImageResponse(
     (
       <div
         style={{
           background: theme.bg,
           width: '100%',
           height: '100%',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           fontFamily: 'Inter, sans-serif',
           position: 'relative',
         }}
       >
         {/* Background pattern */}
         <div
           style={{
             position: 'absolute',
             width: '100%',
             height: '100%',
             backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.accent}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${theme.accent}20 0%, transparent 50%)`,
           }}
         />
         
         {/* Main content */}
         <div
           style={{
             background: 'rgba(255, 255, 255, 0.95)',
             borderRadius: '24px',
             padding: '80px 60px',
             margin: '60px',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             textAlign: 'center',
             boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
             backdropFilter: 'blur(10px)',
             border: '1px solid rgba(255, 255, 255, 0.2)',
             maxWidth: '900px',
           }}
         >
           {/* Logo/Icon */}
           <div
             style={{
               width: '120px',
               height: '120px',
               background: theme.bg,
               borderRadius: '24px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginBottom: '40px',
               boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
             }}
           >
             <span style={{ fontSize: '48px', color: 'white' }}>🎯</span>
           </div>
           
           {/* Title */}
           <h1
             style={{
               fontSize: '64px',
               fontWeight: 800,
               color: '#1f2937',
               marginBottom: '20px',
               lineHeight: '1.1',
               maxWidth: '800px',
             }}
           >
             {title}
           </h1>
           
           {/* Description */}
           <p
             style={{
               fontSize: '28px',
               color: '#6b7280',
               maxWidth: '700px',
               lineHeight: '1.4',
               marginBottom: '40px',
             }}
           >
             {description}
           </p>
           
           {/* Brand */}
           <div
             style={{
               display: 'flex',
               alignItems: 'center',
               gap: '16px',
               fontSize: '24px',
               color: '#3b82f6',
               fontWeight: 600,
             }}
           >
             <span>🚀</span>
             <span>candi-tracker.com</span>
           </div>
         </div>
       </div>
     ),
     {
       width: 1200,
       height: 630,
       fonts: [
         {
           name: 'Inter',
           data: fontData,
           weight: 400,
           style: 'normal',
         },
       ],
     }
   )
 } catch (e) {
   console.error('Erreur génération image OG:', e)
   return new Response('Erreur génération image', { status: 500 })
 }
}

/*
* UTILISATION :
* 
* Image par défaut : /api/og
* Avec titre : /api/og?title=Ma Page&description=Description
* Avec type : /api/og?title=Article Blog&type=blog
* 
* Types disponibles : default, blog, feature, pricing
*/