import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import { Row, Col, Button, Card, Collapse } from 'antd'
import SEO from '../components/seo'
import './styles/pricing.scss'
import 'antd/lib/collapse/style/css'
import imgCloud from '../images/cloud.svg'
import imgBuilding from '../images/building.svg'
import imgChevronRight from '../images/chevron-right.svg'
import imgCloudPlan from '../images/plan-cloud.svg'
import { plans, faqs } from '../pages-content/pricing-data'
import { DollarCircleTwoTone } from '@ant-design/icons'

const PricingPage = () => {
    const [state, setState] = useState({ planOptions: 'cloud' })
    const comparisonRef = useRef()
    const location = useLocation()
    const { Panel } = Collapse

    const setOptionFromQS = () => {
        // On load, set the correct plan options (if applicable)
        const { o } = queryString.parse(location.search)
        if (o && o in plans) setState({ ...state, planOptions: o })
    }

    useEffect(setOptionFromQS, [])

    const handleSegmentChange = (event) => {
        const newOption = event.target.value
        const pushUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?o=${newOption}`
        window.history.pushState({ path: pushUrl }, '', pushUrl)
        setState({ ...state, planOptions: event.target.value })
    }

    const CTAButton = (props) => (
        <Button type={props.plan.callToActionType || (props.plan.popular ? 'primary' : 'default')} size="large">
            {props.plan.callToAction}
        </Button>
    )

    return (
        <Layout>
            <div className="pricing-page-wrapper">
                <div className="pricing-page-container">
                    <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
                    <Row gutter={[24, 24]}>
                        <Col span={24} align="middle">
                            <h1>Pricing for your scale</h1>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col span={24} align="middle">
                            <div className="p-segment">
                                <label className={state.planOptions === 'cloud' ? 'active' : ''}>
                                    <input
                                        type="radio"
                                        value="cloud"
                                        name="planOptions"
                                        checked={state.planOptions === 'cloud'}
                                        onChange={(event) => handleSegmentChange(event)}
                                    />{' '}
                                    Cloud
                                </label>
                                <label className={state.planOptions === 'enterprise' ? 'active' : ''}>
                                    <input
                                        type="radio"
                                        value="enterprise"
                                        name="planOptions"
                                        checked={state.planOptions === 'enterprise'}
                                        onChange={(event) => handleSegmentChange(event)}
                                    />{' '}
                                    Enterprise
                                </label>
                                <label className={state.planOptions === 'open-source' ? 'active' : ''}>
                                    <input
                                        type="radio"
                                        value="open-source"
                                        name="planOptions"
                                        checked={state.planOptions === 'open-source'}
                                        onChange={(event) => handleSegmentChange(event)}
                                    />{' '}
                                    Open source
                                </label>
                            </div>
                            <div style={{ paddingTop: '16px' }}>
                                <a
                                    href="#comparison"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        comparisonRef.current.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        })
                                    }}
                                >
                                    What is the difference?
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[24, 36]} type="flex" style={{ justifyContent: 'center', marginTop: '32px' }}>
                        {(plans[state.planOptions] || []).map((plan) => (
                            <Col
                                className="plan-card"
                                md={24 / plans[state.planOptions].length}
                                sm={24}
                                align="middle"
                                key={plan.title}
                            >
                                {plan.popular && <div className="p-plan-popular-badge">POPULAR</div>}
                                <Card className="p-full-height">
                                    {plan.image && (
                                        <div style={{ marginTop: 16 }}>
                                            <img src={plan.image} alt="" />
                                        </div>
                                    )}
                                    <h3
                                        className={
                                            'header-3' +
                                            (plan.popular ? 'p-text-primary ' : '') +
                                            'p-plan-title ' +
                                            (plan.wraps && 'p-plan-title-wrap')
                                        }
                                    >
                                        {plan.title}
                                    </h3>
                                    <div className="p-plan-price">
                                        {plan.price}
                                        <span className="p-text-primary">{plan.priceDetail}</span>
                                    </div>
                                    <div className="p-plan-description">{plan.description}</div>
                                    {plan.callToActionDest?.type === 'gatsbyLink' && (
                                        <Link to={plan.callToActionDest?.value}>
                                            <CTAButton plan={plan} />
                                        </Link>
                                    )}
                                    {plan.callToActionDest?.type !== 'gatsbyLink' && (
                                        <a href={plan.callToActionDest?.value}>
                                            <CTAButton plan={plan} />
                                        </a>
                                    )}

                                    <div className="p-plan-benefits">
                                        {plan.benefits.map((benefit) => (
                                            <span key={benefit} dangerouslySetInnerHTML={{ __html: benefit }}></span>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                        {state.planOptions === 'cloud' && (
                            <div className="pricing-cloud">
                                <h4>One Price. Pay only for what you use.</h4>
                                <div>
                                    Get all the features with a straight and transparent pricing. Pay based on the
                                    events you ingest every month.
                                </div>
                                <div className="main-price">
                                    <div>
                                        <DollarCircleTwoTone style={{ marginRight: 6 }} />
                                        $0.000225/event
                                    </div>{' '}
                                    per month
                                </div>
                                <Card className="feature-card">
                                    <div className="plan-image">
                                        <img src={imgCloudPlan} alt="" />
                                    </div>
                                    <div className="text-center">
                                        <h5>Features included</h5>
                                    </div>
                                    <ul>
                                        <li>
                                            <b>Unlimited</b> event allocation. Pay only for what you use.
                                        </li>
                                        <li>
                                            <b>Unlimited</b> tracked users
                                        </li>
                                        <li>
                                            <b>Unlimited</b> team members
                                        </li>
                                        <li>
                                            <b>Unlimited</b> projects
                                        </li>
                                        <li>
                                            <b>7 years</b> of data retention
                                            <span className="disclaimer">
                                                <a href="#disclaimer-1">1</a>
                                            </span>
                                        </li>
                                        <li>
                                            <b>All core analytics features</b>
                                        </li>
                                        <li>
                                            Session recording with unlimited storage
                                            <span className="disclaimer">
                                                <a href="#disclaimer-2">2</a>
                                            </span>
                                        </li>
                                        <li>Feature flags</li>
                                        <li>Plugins &amp; other integrations</li>
                                        <li>Zapier integration</li>
                                        <li>SSO/SAML</li>
                                        <li>Export to data lakes</li>
                                        <li>Community, Slack &amp; Email support</li>
                                    </ul>
                                    For companies using on average 1,000,000 events per month or more, we offer{' '}
                                    <b>priority support</b>.
                                </Card>
                            </div>
                        )}
                        <Col span={24} align="middle">
                            All prices in US Dollars (USD), excluding taxes
                        </Col>
                        <Col span={24} align="middle">
                            <Link to="/docs/features" className="p-features-link">
                                Full features details <img alt="" src={imgChevronRight} />
                            </Link>
                        </Col>
                        {state.planOptions === 'cloud' && (
                            <div className="disclaimer-details">
                                <div id="disclaimer-1">
                                    1. Data may be moved to cold storage after 12 months. Queries that involve data in
                                    cold storage can take longer than normal to run.
                                </div>
                                <div id="disclaimer-2">
                                    2. While there is no restriction on session recording storage, session recording
                                    information is captured and stored as normal events and therefore billed as such.
                                </div>
                            </div>
                        )}
                    </Row>
                    <br />
                    <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
                        <Col span={24}>
                            <div ref={comparisonRef} id="comparison"></div>
                            <h2>Cloud vs. Enterprise</h2>
                            <p>
                                Cloud or Enterprise? We'd love to help you find the option that's <b>right for you</b>.
                            </p>
                        </Col>
                        <Row type="flex" gutter={[24, 24]} style={{ paddingLeft: '16px' }}>
                            <Col md={12} sm={24}>
                                <div className="p-full-height">
                                    <h4 className="p-text-primary p-title-with-icon">
                                        <img src={imgCloud} alt="" style={{ paddingRight: 0 }} />
                                        Cloud
                                    </h4>
                                    <ul className="p-comparison-list">
                                        <li>
                                            Recommended if you want to get started <b>right now</b>. Start capturing
                                            events in under 5 minutes.
                                        </li>
                                        <li>
                                            You don’t own or want to own your own technical infrastructure.
                                            <b> We’ll handle everything for you.</b>
                                        </li>
                                        <li>You want an out-of-the-box secure solution.</li>
                                        <li>You want to get automatic updates with all the latest features.</li>
                                    </ul>
                                    <div className="p-comparison-btn">
                                        <a href="https://app.posthog.com/signup?plan=starter">
                                            <Button type="primary" size="large">
                                                Start my 30-day free trial
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} sm={24}>
                                <div className="p-full-height">
                                    <h4 className="p-text-primary p-title-with-icon">
                                        <img src={imgBuilding} alt="" /> Enterprise
                                    </h4>
                                    <ul className="p-comparison-list">
                                        <li>Recommended if you have large volumes of events or users ({'>100k'}).</li>
                                        <li>
                                            You have strict compliance requirements on privacy or data handling (e.g.
                                            HIPAA, SOC2).
                                        </li>
                                        <li>
                                            You need dedicated support, and want regular touch points with our team to
                                            get the best value.
                                        </li>
                                        <li>
                                            You are concerned with browser privacy features, ad blockers, or third-party
                                            cookie blockers.
                                        </li>
                                    </ul>
                                    <div className="p-comparison-btn">
                                        <Button
                                            type="primary"
                                            size="large"
                                            href="mailto:sales@posthog.com?title=Start enterprise deployment"
                                        >
                                            Contact sales
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: '60px' }}>
                        <Col span={24}>
                            <h2>Frequently asked questions</h2>
                        </Col>
                        <Col span={24} className="p-faqs">
                            <Collapse bordered={false}>
                                {faqs.map((faq, i) => (
                                    <Panel header={faq.q} key={i}>
                                        {faq.a}
                                    </Panel>
                                ))}
                            </Collapse>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: '60px' }}>
                        <Col span={24} align="middle">
                            <h2 className="p-text-primary">Ready to get started?</h2>
                            <a href="https://app.posthog.com/signup">
                                <Button type="primary" size="large">
                                    Create my free account
                                </Button>
                            </a>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    )
}

export default PricingPage
