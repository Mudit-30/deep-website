import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeepStation x MSRIT | AI Education, Made for India",
  description:
    "The official autonomous college chapter of the DeepStation AI community at Ramaiah Institute of Technology. Join elite hackathons, expert events, and hands-on workshops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
