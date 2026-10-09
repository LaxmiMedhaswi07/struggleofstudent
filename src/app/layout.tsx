import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Struggle of Student (SS) | A platform built by students, for students',
  description: 'Empowering students to turn struggles into real opportunities. Internships, Jobs, Live Events, SS Band, IT Solutions, and 1-on-1 Peer Guidance.',
  keywords: ['Struggle of Student', 'SS', 'Student Community', 'Internships', 'Placements', 'SS Band', 'Event Management', 'Peer Guidance'],
  authors: [{ name: 'Struggle of Student Team' }],
  icons: {
    icon: '/ss-icon.svg',
    shortcut: '/ss-icon.svg',
    apple: '/ss-icon.svg',
  },
  openGraph: {
    title: 'Struggle of Student (SS)',
    description: 'Your Struggles. Your Opportunities. Your Community.',
    siteName: 'Struggle of Student',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/ss-icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
