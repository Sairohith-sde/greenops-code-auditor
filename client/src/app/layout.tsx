import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GreenOps Code Auditor | Algorithmic Carbon Reduction Platform',
  description:
    'AI-powered computational efficiency auditor analyzing Big O complexity, estimating carbon penalty scores, and refactoring inefficient code to cut data center energy consumption.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 text-gray-100 min-h-screen antialiased selection:bg-emerald-500 selection:text-dark-900">
        {children}
      </body>
    </html>
  );
}
