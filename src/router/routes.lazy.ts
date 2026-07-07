import React from "react";

export const LandingPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/LandingPage")).default
        }
    )
)


export const DocumentationPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/DocumentationPage")).default
        }
    )
)


export const RulePage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/RulePage")).default
        }
    )
)

export const EvaluationResultPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/ArticleEvaluationResult")).default
        }
    )
)

export const NotFoundPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/NotFoundPage")).default
        }
    )
)


export const RuleDetailsPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/RuleDetailsPage")).default
        }
    )
)

export const RuleEditPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/RuleDetailsPage")).default
        }
    )
)


export const RuleAddPage = React.lazy(
    async () => (
        {
            default: (await import ("../pages/RuleDetailsPage")).default
        }
    )
)