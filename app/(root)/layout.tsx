import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlashLearn",
  description: "Generated your flashcards",
  icons: {
    icon: "/icons/flash-logo.svg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
