
import { CartProvider } from "@/lib/cartContext";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
         <CartProvider>
        {children}
         </CartProvider>
      </body>
    </html>
  );
}
