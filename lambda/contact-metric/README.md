# portfolio-contact-metric

Publishes a CloudWatch custom metric (`Portfolio/ContactForm`, dimensioned by `Status`) whenever the contact form's `reportContactMetric()` call reaches it. Sits behind the `$default` route on API Gateway HTTP API `sqhjzyzhw2`.

Deploy: `npm run deploy:contact-metric` from the repo root.
