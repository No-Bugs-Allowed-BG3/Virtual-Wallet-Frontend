import "./global.css"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <head>
    </head>
    <body>
        <div id="maindiv">
            <div id="leftdiv"></div>
            <div id="contentdiv">
                <div id="logodiv">
                    <p id="logo_name">MoneyHUB</p>
                    <p id="logo_descr">Virtual wallet</p>
                </div>
                {children}
            </div>
            <div id="rightdiv"></div>
        </div>
    </body>
</html>
  );
}
