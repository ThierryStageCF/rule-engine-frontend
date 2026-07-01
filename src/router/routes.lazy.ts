import React from "react";

export const LandingPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/LandingPage.tsx")).default
        }
    )
)