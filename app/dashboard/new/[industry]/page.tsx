"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import DatePicker from "@/components/DatePicker";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft2, Magicpen, Brush2, VideoPlay, Edit, Calendar, Briefcase, Building, Microphone2, Judge, Setting4 } from "iconsax-react";

const industryIcons: Record<string, typeof Magicpen> = {
    marketing: Magicpen,
    design: Brush2,
    video: VideoPlay,
    content: Edit,
    events: Calendar,
    consulting: Briefcase,
    architecture: Building,
    pr: Microphone2,
    legal: Judge,
    custom: Setting4,
};

const industryData: Record<string, { name: string; icon: string; sections: { title: string; questions: { id: string; question: string; type: string; placeholder?: string; options?: string[] }[] }[] }> = {
    marketing: {
        name: "Marketing & Advertising",
        icon: "megaphone",
        sections: [
            {
                title: "Project Basics",
                questions: [
                    { id: "project_type", question: "What type of marketing project is this?", type: "select", options: ["Campaign", "Brand Launch", "Social Media", "Content Series", "Product Launch", "Other"] },
                    { id: "project_name", question: "What is the project name or working title?", type: "text", placeholder: "e.g. Q4 Holiday Campaign" },
                    { id: "client", question: "Who is the client?", type: "textarea", placeholder: "Company name, industry, brief background" },
                    { id: "main_goal", question: "What is the single most important thing this project must achieve?", type: "textarea", placeholder: "The primary objective" },
                ],
            },
            {
                title: "Objectives & Goals",
                questions: [
                    { id: "primary_objectives", question: "What are the primary objectives?", type: "multiselect", options: ["Awareness", "Lead Generation", "Sales", "Engagement", "Brand Repositioning"] },
                    { id: "kpis", question: "What specific KPIs will measure success?", type: "textarea", placeholder: "e.g. Impressions, Clicks, Conversions, Revenue" },
                ],
            },
            {
                title: "Target Audience",
                questions: [
                    { id: "target_audience", question: "Who is the primary target audience?", type: "textarea", placeholder: "Demographics, psychographics, behaviors" },
                    { id: "audience_problem", question: "What problem does this audience have that we're solving?", type: "textarea", placeholder: "The pain point we address" },
                ],
            },
            {
                title: "Timeline & Budget",
                questions: [
                    { id: "launch_date", question: "What is the campaign launch date?", type: "date" },
                    { id: "budget", question: "What is the overall budget?", type: "text", placeholder: "$0" },
                ],
            },
        ],
    },
    design: {
        name: "Design & Creative",
        icon: "post",
        sections: [
            {
                title: "Project Basics",
                questions: [
                    { id: "project_type", question: "What type of design project is this?", type: "select", options: ["Logo/Branding", "Website", "App/UI", "Print Collateral", "Packaging", "Other"] },
                    { id: "project_name", question: "What is the project name?", type: "text", placeholder: "e.g. Brand Refresh 2024" },
                    { id: "company_info", question: "Tell us about your company/brand", type: "textarea", placeholder: "Industry, what you do, how long in business" },
                ],
            },
            {
                title: "Goals & Objectives",
                questions: [
                    { id: "main_goal", question: "What is the main goal of this design project?", type: "textarea", placeholder: "Primary objective" },
                    { id: "problem", question: "What problem are you trying to solve with this design?", type: "textarea", placeholder: "The challenge we're addressing" },
                ],
            },
            {
                title: "Brand & Style",
                questions: [
                    { id: "brand_personality", question: "What adjectives describe your brand personality?", type: "multiselect", options: ["Modern", "Traditional", "Bold", "Minimal", "Playful", "Professional", "Elegant", "Edgy"] },
                    { id: "design_likes", question: "Share examples of designs you love", type: "textarea", placeholder: "Links or descriptions" },
                ],
            },
            {
                title: "Timeline & Budget",
                questions: [
                    { id: "deadline", question: "What is your ideal completion date?", type: "date" },
                    { id: "budget", question: "What is your budget range for this project?", type: "text", placeholder: "$0" },
                ],
            },
        ],
    },
    video: {
        name: "Video Production",
        icon: "play",
        sections: [
            {
                title: "Project Basics",
                questions: [
                    { id: "video_type", question: "What type of video project is this?", type: "select", options: ["Commercial", "Corporate", "Event", "Documentary", "Social Media", "Training", "Other"] },
                    { id: "project_name", question: "What is the project name or working title?", type: "text", placeholder: "e.g. Product Launch Video" },
                ],
            },
            {
                title: "Purpose & Goals",
                questions: [
                    { id: "purpose", question: "What is the primary purpose of this video?", type: "textarea", placeholder: "Main objective" },
                    { id: "distribution", question: "Where will this video be shown?", type: "multiselect", options: ["Website", "Social Media", "TV", "Event", "Internal", "YouTube", "Streaming"] },
                ],
            },
            {
                title: "Creative Direction",
                questions: [
                    { id: "core_message", question: "What is the core message of this video?", type: "textarea", placeholder: "One sentence summary" },
                    { id: "tone", question: "What tone/mood should the video convey?", type: "multiselect", options: ["Inspirational", "Educational", "Humorous", "Emotional", "Corporate", "Cinematic", "Casual"] },
                ],
            },
            {
                title: "Technical Requirements",
                questions: [
                    { id: "duration", question: "What is the target video length?", type: "select", options: ["15 seconds", "30 seconds", "60 seconds", "2-3 minutes", "5+ minutes"] },
                    { id: "aspect_ratio", question: "What aspect ratio(s) do you need?", type: "multiselect", options: ["16:9 (Landscape)", "9:16 (Vertical)", "1:1 (Square)", "4:5 (Social)"] },
                ],
            },
            {
                title: "Timeline & Budget",
                questions: [
                    { id: "delivery_deadline", question: "What is the final delivery deadline?", type: "date" },
                    { id: "budget", question: "What is the budget for this project?", type: "text", placeholder: "$0" },
                ],
            },
        ],
    },
    content: {
        name: "Content Marketing & SEO",
        icon: "align-right",
        sections: [
            {
                title: "Content Basics",
                questions: [
                    { id: "content_type", question: "What type of content is this?", type: "select", options: ["Blog Post", "Article", "Whitepaper", "Case Study", "eBook", "Landing Page", "Email Sequence", "Other"] },
                    { id: "topic", question: "What is the topic or working title?", type: "text", placeholder: "e.g. Ultimate Guide to..." },
                    { id: "primary_keyword", question: "What is the primary keyword or topic cluster?", type: "text", placeholder: "Main SEO keyword" },
                ],
            },
            {
                title: "Goals & SEO",
                questions: [
                    { id: "goal", question: "What is the primary goal of this content?", type: "select", options: ["Traffic", "Leads", "Conversions", "Education", "SEO Ranking"] },
                    { id: "word_count", question: "What is the target word count?", type: "select", options: ["500-800", "800-1200", "1200-2000", "2000-3000", "3000+"] },
                ],
            },
            {
                title: "Target Audience",
                questions: [
                    { id: "target_reader", question: "Who is the target reader?", type: "textarea", placeholder: "Job title, industry, experience level" },
                    { id: "reader_outcome", question: "What should the reader be able to do after reading this?", type: "textarea", placeholder: "Desired outcome" },
                ],
            },
            {
                title: "Logistics",
                questions: [
                    { id: "deadline", question: "What is the deadline for first draft?", type: "date" },
                ],
            },
        ],
    },
    events: {
        name: "Event Planning",
        icon: "calendar",
        sections: [
            {
                title: "Event Basics",
                questions: [
                    { id: "event_type", question: "What type of event is this?", type: "select", options: ["Corporate Conference", "Wedding", "Product Launch", "Trade Show", "Gala", "Workshop", "Private Party", "Other"] },
                    { id: "event_name", question: "What is the event name?", type: "text", placeholder: "e.g. Annual Company Summit" },
                    { id: "event_date", question: "What is the event date and time?", type: "date" },
                    { id: "attendees", question: "What is the expected number of attendees?", type: "select", options: ["1-25", "26-50", "51-100", "101-250", "251-500", "500+"] },
                ],
            },
            {
                title: "Purpose & Goals",
                questions: [
                    { id: "purpose", question: "What is the primary purpose of this event?", type: "textarea", placeholder: "Main objective" },
                    { id: "attendee_experience", question: "What do you want attendees to feel or experience?", type: "textarea", placeholder: "Desired atmosphere" },
                ],
            },
            {
                title: "Theme & Style",
                questions: [
                    { id: "theme", question: "Is there a theme or concept for the event?", type: "textarea", placeholder: "Theme description" },
                    { id: "mood", question: "What is the desired mood/atmosphere?", type: "multiselect", options: ["Formal", "Casual", "Elegant", "Fun", "Professional", "Intimate", "Grand"] },
                ],
            },
            {
                title: "Budget",
                questions: [
                    { id: "total_budget", question: "What is the total event budget?", type: "text", placeholder: "$0" },
                ],
            },
        ],
    },
    consulting: {
        name: "Management Consulting",
        icon: "briefcase",
        sections: [
            {
                title: "Engagement Basics",
                questions: [
                    { id: "engagement_type", question: "What type of engagement is this?", type: "select", options: ["Strategy", "Operations", "Technology", "Organizational Change", "Financial Advisory", "Market Research", "Other"] },
                    { id: "project_name", question: "What is the project or engagement name?", type: "text", placeholder: "e.g. Digital Transformation Initiative" },
                    { id: "organization", question: "Tell us about your organization", type: "textarea", placeholder: "Industry, size, revenue, structure" },
                ],
            },
            {
                title: "Problem Definition",
                questions: [
                    { id: "core_problem", question: "What is the core problem or challenge you're facing?", type: "textarea", placeholder: "Main challenge" },
                    { id: "consequences", question: "What happens if this problem is not solved?", type: "textarea", placeholder: "Impact of inaction" },
                ],
            },
            {
                title: "Goals & Objectives",
                questions: [
                    { id: "desired_outcome", question: "What is the desired outcome of this engagement?", type: "textarea", placeholder: "End goal" },
                    { id: "kpis", question: "What are the measurable KPIs or metrics?", type: "textarea", placeholder: "Key performance indicators" },
                ],
            },
            {
                title: "Timeline & Budget",
                questions: [
                    { id: "timeline", question: "What is the timeline for this engagement?", type: "textarea", placeholder: "Start date, end date, phases" },
                    { id: "budget", question: "What is the budget?", type: "text", placeholder: "$0" },
                ],
            },
        ],
    },
    architecture: {
        name: "Architecture & Construction",
        icon: "building",
        sections: [
            {
                title: "Project Basics",
                questions: [
                    { id: "project_type", question: "What type of project is this?", type: "select", options: ["Residential New Build", "Residential Renovation", "Commercial", "Interior Fit-out", "Landscape", "Mixed-Use", "Other"] },
                    { id: "project_name", question: "What is the project name or address?", type: "text", placeholder: "e.g. 123 Main Street Residence" },
                    { id: "client_type", question: "Tell us about the client", type: "select", options: ["Individual Homeowner", "Developer", "Business", "Government", "Non-Profit", "Other"] },
                    { id: "your_role", question: "What is your role?", type: "select", options: ["Architect", "General Contractor", "Project Manager", "Owner", "Designer", "Other"] },
                    { id: "project_trigger", question: "What triggered this project?", type: "textarea", placeholder: "New purchase, expansion, renovation, compliance issue, etc." },
                ],
            },
            {
                title: "Project Vision & Goals",
                questions: [
                    { id: "vision", question: "Describe the vision for this project in a few sentences", type: "textarea", placeholder: "Overall vision and aspiration" },
                    { id: "primary_goal", question: "What is the primary goal?", type: "select", options: ["Build New Space", "Renovate Existing", "Change of Use", "Improve Efficiency", "Expand Capacity", "Other"] },
                    { id: "style", question: "What style or aesthetic is desired?", type: "multiselect", options: ["Modern", "Traditional", "Industrial", "Minimalist", "Contemporary", "Rustic", "Mediterranean", "Other"] },
                    { id: "must_haves", question: "What are the must-have features or elements?", type: "textarea", placeholder: "Essential requirements" },
                    { id: "nice_to_haves", question: "What are the nice-to-have features?", type: "textarea", placeholder: "Desired but not essential" },
                    { id: "avoid", question: "Are there any design elements to avoid?", type: "textarea", placeholder: "Things you don't want" },
                ],
            },
            {
                title: "Site & Existing Conditions",
                questions: [
                    { id: "site_address", question: "What is the site address?", type: "text", placeholder: "Full address" },
                    { id: "lot_size", question: "What is the lot/plot size?", type: "text", placeholder: "e.g. 0.5 acres, 10,000 sq ft" },
                    { id: "existing_structure", question: "Is there an existing structure?", type: "select", options: ["No", "Yes - Keep and Renovate", "Yes - Demolish", "Yes - Partial Demo"] },
                    { id: "site_constraints", question: "Are there any known site constraints?", type: "textarea", placeholder: "Slope, soil conditions, easements, etc." },
                    { id: "views_orientation", question: "Are there any views or orientations to prioritize?", type: "textarea", placeholder: "Mountain views, southern exposure, etc." },
                ],
            },
            {
                title: "Program & Space Requirements",
                questions: [
                    { id: "spaces_required", question: "What spaces/rooms are required?", type: "textarea", placeholder: "List all with approximate sizes if known" },
                    { id: "occupants", question: "How many occupants will use this space?", type: "text", placeholder: "Number of people" },
                    { id: "adjacency", question: "Are there any specific adjacency requirements?", type: "textarea", placeholder: "What spaces need to be near each other?" },
                    { id: "accessibility", question: "Are there any accessibility requirements?", type: "multiselect", options: ["ADA Compliance", "Aging-in-Place", "Wheelchair Access", "None Specific"] },
                    { id: "special_equipment", question: "Are there any special equipment or systems needed?", type: "textarea", placeholder: "Commercial kitchen, server room, etc." },
                    { id: "total_sqft", question: "What is the desired total square footage?", type: "text", placeholder: "e.g. 3,500 sq ft" },
                ],
            },
            {
                title: "Technical Requirements",
                questions: [
                    { id: "sustainability", question: "Are there any sustainability or energy goals?", type: "multiselect", options: ["LEED Certification", "Net Zero", "Solar Ready", "Passive House", "Energy Star", "None Specific"] },
                    { id: "materials", question: "Are there specific material preferences?", type: "multiselect", options: ["Wood", "Steel", "Concrete", "Brick", "Glass", "Stone", "No Preference"] },
                    { id: "structural", question: "Are there any structural considerations?", type: "textarea", placeholder: "Open spans, load requirements, etc." },
                    { id: "mep_systems", question: "What MEP systems are needed?", type: "textarea", placeholder: "HVAC type, electrical capacity, plumbing fixtures" },
                    { id: "smart_building", question: "Are there any technology/smart building requirements?", type: "textarea", placeholder: "Home automation, security systems, etc." },
                ],
            },
            {
                title: "Regulatory & Compliance",
                questions: [
                    { id: "zoning", question: "What is the zoning designation?", type: "text", placeholder: "e.g. R-1, C-2, Mixed-Use" },
                    { id: "zoning_restrictions", question: "Are there any known zoning restrictions?", type: "textarea", placeholder: "Height, setbacks, FAR, etc." },
                    { id: "special_district", question: "Is the property in any special district?", type: "multiselect", options: ["Historic District", "Coastal Zone", "Flood Zone", "HOA", "None"] },
                    { id: "permitting_challenges", question: "Are there any known permitting challenges?", type: "textarea", placeholder: "Known issues or concerns" },
                ],
            },
            {
                title: "Budget & Timeline",
                questions: [
                    { id: "total_budget", question: "What is the total project budget?", type: "text", placeholder: "Construction + soft costs" },
                    { id: "construction_budget", question: "What is the construction budget specifically?", type: "text", placeholder: "$0" },
                    { id: "contingency", question: "Is there contingency built in?", type: "select", options: ["Yes - 5%", "Yes - 10%", "Yes - 15%", "Yes - 20%", "No", "Not Sure"] },
                    { id: "priority", question: "What is the priority: Quality, Cost, or Speed?", type: "select", options: ["Quality First", "Cost First", "Speed First", "Balanced"] },
                    { id: "start_date", question: "What is the desired project start date?", type: "date" },
                    { id: "completion_date", question: "What is the target completion date?", type: "date" },
                    { id: "hard_deadlines", question: "Are there any hard deadlines?", type: "textarea", placeholder: "Lease expiration, event, school year, etc." },
                ],
            },
            {
                title: "Team & Deliverables",
                questions: [
                    { id: "decision_makers", question: "Who are the key decision-makers?", type: "textarea", placeholder: "Names and roles" },
                    { id: "consultants", question: "Are there any other consultants involved?", type: "textarea", placeholder: "Structural, MEP, landscape, interior design" },
                    { id: "gc_selected", question: "Is a general contractor already selected?", type: "select", options: ["Yes", "No", "In Process"] },
                    { id: "design_phases", question: "What design phases are included?", type: "multiselect", options: ["Schematic Design", "Design Development", "Construction Documents", "Construction Administration"] },
                    { id: "deliverables", question: "What deliverables are expected?", type: "multiselect", options: ["Drawings", "3D Renderings", "Physical Models", "Specifications", "Cost Estimates"] },
                ],
            },
            {
                title: "Additional Information",
                questions: [
                    { id: "past_lessons", question: "Are there any lessons from past projects to apply here?", type: "textarea", placeholder: "What worked or didn't work before" },
                    { id: "concerns", question: "Are there any concerns or risks you foresee?", type: "textarea", placeholder: "Potential challenges" },
                    { id: "additional_info", question: "Is there anything else we should know?", type: "textarea", placeholder: "Any other relevant information" },
                ],
            },
        ],
    },
    pr: {
        name: "Public Relations",
        icon: "microphone",
        sections: [
            {
                title: "Project Basics",
                questions: [
                    { id: "pr_type", question: "What type of PR engagement is this?", type: "select", options: ["Product Launch", "Crisis Management", "Brand Awareness", "Thought Leadership", "Event PR", "Reputation Management", "Investor Relations", "Other"] },
                    { id: "campaign_name", question: "What is the campaign or project name?", type: "text", placeholder: "e.g. Q1 Product Launch PR" },
                    { id: "client_info", question: "Tell us about the client/organization", type: "textarea", placeholder: "Industry, size, brief background" },
                    { id: "spokespersons", question: "Who are the key spokespersons or executives involved?", type: "textarea", placeholder: "Names and titles" },
                    { id: "trigger", question: "What triggered this PR initiative?", type: "textarea", placeholder: "Event, announcement, issue, etc." },
                ],
            },
            {
                title: "Objectives & Goals",
                questions: [
                    { id: "primary_objective", question: "What is the primary objective of this PR campaign?", type: "select", options: ["Awareness", "Reputation Building", "Crisis Response", "Launch Coverage", "Thought Leadership", "Investor Relations", "Other"] },
                    { id: "measurable_goals", question: "What are the specific, measurable goals?", type: "textarea", placeholder: "Media placements, share of voice, sentiment change, etc." },
                    { id: "success_definition", question: "What does success look like for this campaign?", type: "textarea", placeholder: "Describe the ideal outcome" },
                    { id: "secondary_objectives", question: "Are there any secondary objectives?", type: "textarea", placeholder: "Additional goals" },
                    { id: "goal_timeframe", question: "What is the timeframe for achieving these goals?", type: "text", placeholder: "e.g. 3 months, 6 months" },
                ],
            },
            {
                title: "Target Audiences",
                questions: [
                    { id: "primary_audiences", question: "Who are the primary target audiences?", type: "multiselect", options: ["Consumers", "Investors", "Industry Professionals", "Government", "Employees", "Media", "Influencers"] },
                    { id: "media_outlets", question: "What media outlets do these audiences consume?", type: "textarea", placeholder: "Publications, channels, platforms" },
                    { id: "current_perception", question: "What do these audiences currently think/know about the client?", type: "textarea", placeholder: "Current perception" },
                    { id: "desired_perception", question: "What do we want them to think/know after the campaign?", type: "textarea", placeholder: "Desired perception" },
                    { id: "influencers", question: "Are there any influencers or thought leaders relevant to this audience?", type: "textarea", placeholder: "Names or types of influencers" },
                ],
            },
            {
                title: "Key Messages",
                questions: [
                    { id: "main_message", question: "What is the single most important message to communicate?", type: "textarea", placeholder: "Core message" },
                    { id: "supporting_messages", question: "What are 3-5 supporting key messages?", type: "textarea", placeholder: "Supporting points" },
                    { id: "proof_points", question: "What proof points or evidence support these messages?", type: "textarea", placeholder: "Data, testimonials, case studies" },
                    { id: "messages_to_avoid", question: "Are there any messages or topics to avoid?", type: "textarea", placeholder: "Sensitive topics, off-limits areas" },
                    { id: "legal_restrictions", question: "Are there any legal or compliance restrictions on messaging?", type: "textarea", placeholder: "Regulatory constraints" },
                ],
            },
            {
                title: "Media Strategy",
                questions: [
                    { id: "media_types", question: "What types of media coverage are you targeting?", type: "multiselect", options: ["Tier 1 National", "Trade Publications", "Local Media", "Broadcast TV", "Digital/Online", "Podcasts", "Social Media"] },
                    { id: "priority_publications", question: "Are there specific publications or journalists to prioritize?", type: "textarea", placeholder: "Target outlets and contacts" },
                    { id: "avoid_publications", question: "Are there any publications or journalists to avoid?", type: "textarea", placeholder: "Outlets to exclude" },
                    { id: "current_media_profile", question: "What is the client's current media profile?", type: "select", options: ["Frequently Covered", "Occasionally Covered", "Rarely Covered", "Negative Coverage History", "No Coverage History"] },
                    { id: "existing_relationships", question: "Are there any existing media relationships to leverage?", type: "textarea", placeholder: "Current contacts and relationships" },
                ],
            },
            {
                title: "Story Angles & News Hooks",
                questions: [
                    { id: "main_story_angle", question: "What is the main story angle or news hook?", type: "textarea", placeholder: "Primary narrative" },
                    { id: "newsworthiness", question: "What makes this newsworthy?", type: "multiselect", options: ["Timing/Trend", "Exclusive Data", "Human Interest", "Controversy", "Industry First", "Celebrity/Executive", "Local Impact"] },
                    { id: "upcoming_events", question: "Are there any upcoming events or dates to tie into?", type: "textarea", placeholder: "Relevant dates or events" },
                    { id: "exclusive_content", question: "Is there exclusive data, research, or announcements to leverage?", type: "textarea", placeholder: "Unique content assets" },
                    { id: "visual_assets", question: "What visual assets are available?", type: "multiselect", options: ["Professional Photos", "Video Content", "Infographics", "Product Images", "Executive Headshots", "None Yet"] },
                ],
            },
            {
                title: "Competitive Landscape",
                questions: [
                    { id: "competitors", question: "Who are the main competitors?", type: "textarea", placeholder: "Key competitors" },
                    { id: "competitor_positioning", question: "How are competitors currently positioned in media?", type: "textarea", placeholder: "Their media presence" },
                    { id: "share_of_voice", question: "What share of voice does the client have vs. competitors?", type: "select", options: ["Leading", "On Par", "Behind", "Unknown"] },
                    { id: "differentiation", question: "How should we differentiate from competitors in messaging?", type: "textarea", placeholder: "Key differentiators" },
                ],
            },
            {
                title: "Crisis Considerations",
                questions: [
                    { id: "negative_news", question: "Is there any negative news or crisis to address?", type: "select", options: ["Yes - Active Crisis", "Yes - Past Issue", "Potential Risk", "No"] },
                    { id: "current_narrative", question: "What is the current narrative we need to change?", type: "textarea", placeholder: "If applicable" },
                    { id: "sensitive_topics", question: "Are there any sensitive topics or skeletons in the closet?", type: "textarea", placeholder: "Potential vulnerabilities" },
                    { id: "crisis_protocol", question: "Is there an approved crisis communication protocol?", type: "select", options: ["Yes", "No", "In Development"] },
                ],
            },
            {
                title: "Deliverables & Tactics",
                questions: [
                    { id: "pr_tactics", question: "What PR tactics are expected?", type: "multiselect", options: ["Press Releases", "Media Pitches", "Press Events", "Media Tours", "Bylines/Op-Eds", "Interviews", "Award Submissions"] },
                    { id: "press_releases", question: "How many press releases are anticipated?", type: "select", options: ["1-2", "3-5", "6-10", "10+", "As Needed"] },
                    { id: "media_events", question: "Are media events or press conferences planned?", type: "select", options: ["Yes", "No", "Possibly"] },
                    { id: "social_amplification", question: "Is social media amplification included?", type: "select", options: ["Yes", "No", "Limited"] },
                    { id: "speaking_opportunities", question: "Are there any speaking opportunities to pursue?", type: "textarea", placeholder: "Conferences, panels, podcasts" },
                ],
            },
            {
                title: "Timeline & Budget",
                questions: [
                    { id: "campaign_start", question: "What is the campaign start date?", type: "date" },
                    { id: "campaign_end", question: "What is the campaign end date or duration?", type: "text", placeholder: "End date or duration" },
                    { id: "milestone_dates", question: "Are there any key milestone dates?", type: "textarea", placeholder: "Launch date, announcement date, event date" },
                    { id: "embargo_dates", question: "Are there any embargoes to coordinate?", type: "textarea", placeholder: "Embargo details" },
                    { id: "pr_budget", question: "What is the total PR budget?", type: "text", placeholder: "$0" },
                    { id: "events_budget", question: "Is there a separate budget for media events or paid placement?", type: "text", placeholder: "$0" },
                ],
            },
            {
                title: "Measurement & Reporting",
                questions: [
                    { id: "success_metrics", question: "How should success be measured?", type: "multiselect", options: ["Media Impressions", "Number of Placements", "Share of Voice", "Sentiment Analysis", "Website Traffic", "Social Engagement"] },
                    { id: "reporting_frequency", question: "How often should reporting be provided?", type: "select", options: ["Weekly", "Bi-Weekly", "Monthly", "Campaign-End Only"] },
                    { id: "specific_kpis", question: "Are there any specific KPIs required by the client?", type: "textarea", placeholder: "Client-specific metrics" },
                ],
            },
            {
                title: "Logistics & Approvals",
                questions: [
                    { id: "primary_contact", question: "Who is the primary client contact?", type: "text", placeholder: "Name and contact info" },
                    { id: "approval_contact", question: "Who approves press releases and statements?", type: "text", placeholder: "Name and title" },
                    { id: "approval_turnaround", question: "What is the approval turnaround time?", type: "select", options: ["Same Day", "24 Hours", "48 Hours", "1 Week", "Varies"] },
                    { id: "additional_info", question: "Anything else we should know?", type: "textarea", placeholder: "Any other relevant information" },
                ],
            },
        ],
    },
    legal: {
        name: "Legal Services",
        icon: "judge",
        sections: [
            {
                title: "Client Information",
                questions: [
                    { id: "matter_type", question: "What type of legal matter is this?", type: "select", options: ["Family Law - Divorce", "Family Law - Custody", "Family Law - Adoption", "Family Law - Prenup", "Estate Planning - Will", "Estate Planning - Trust", "Estate Planning - Power of Attorney", "Estate Planning - Probate", "Other"] },
                    { id: "client_name", question: "Client full legal name", type: "text", placeholder: "Full legal name" },
                    { id: "client_dob", question: "Client date of birth", type: "date" },
                    { id: "client_contact", question: "Client contact information", type: "textarea", placeholder: "Phone, Email, Address" },
                    { id: "preferred_contact", question: "Preferred method of contact", type: "select", options: ["Phone", "Email", "Text", "Mail"] },
                    { id: "referral_source", question: "How did the client hear about the firm?", type: "select", options: ["Referral", "Online Search", "Social Media", "Advertisement", "Previous Client", "Other"] },
                    { id: "prior_attorney", question: "Has the client worked with an attorney on this matter before?", type: "select", options: ["Yes", "No"] },
                ],
            },
            {
                title: "Matter Overview",
                questions: [
                    { id: "matter_description", question: "Briefly describe the legal matter in the client's own words", type: "textarea", placeholder: "Client's description of the situation" },
                    { id: "primary_goal", question: "What is the client's primary goal or desired outcome?", type: "textarea", placeholder: "Desired resolution" },
                    { id: "urgency", question: "What is the urgency level?", type: "select", options: ["Immediate", "Within 30 Days", "Within 90 Days", "Flexible"] },
                    { id: "upcoming_deadlines", question: "Are there any upcoming deadlines or court dates?", type: "textarea", placeholder: "Important dates" },
                    { id: "opposing_counsel", question: "Is there any opposing counsel already involved?", type: "textarea", placeholder: "Name, firm, contact if known" },
                ],
            },
            {
                title: "Personal & Family Information",
                questions: [
                    { id: "marital_status", question: "Current marital status", type: "select", options: ["Single", "Married", "Separated", "Divorced", "Widowed", "Domestic Partnership"] },
                    { id: "marriage_date", question: "Date of marriage (if applicable)", type: "date" },
                    { id: "separation_date", question: "Date of separation (if applicable)", type: "date" },
                    { id: "spouse_name", question: "Spouse/partner full legal name", type: "text", placeholder: "If applicable" },
                    { id: "minor_children", question: "Are there minor children from this relationship?", type: "select", options: ["Yes", "No"] },
                    { id: "children_details", question: "If yes, provide children's names and dates of birth", type: "textarea", placeholder: "Names and DOBs" },
                    { id: "living_arrangements", question: "Current living arrangements", type: "textarea", placeholder: "Who lives where?" },
                ],
            },
            {
                title: "Employment & Financial Overview",
                questions: [
                    { id: "client_employer", question: "Client's employer and occupation", type: "text", placeholder: "Employer and job title" },
                    { id: "client_income", question: "Client's approximate annual income", type: "text", placeholder: "$0" },
                    { id: "spouse_employer", question: "Spouse's employer and occupation (if known)", type: "text", placeholder: "If applicable" },
                    { id: "spouse_income", question: "Spouse's approximate annual income (if known)", type: "text", placeholder: "$0" },
                    { id: "business_interests", question: "Are there any business interests owned by either party?", type: "textarea", placeholder: "Business details" },
                    { id: "prenup_exists", question: "Is there a prenuptial or postnuptial agreement?", type: "select", options: ["Yes", "No", "Unknown"] },
                ],
            },
            {
                title: "Assets & Debts",
                questions: [
                    { id: "major_assets", question: "List major assets", type: "textarea", placeholder: "Real estate, vehicles, bank accounts, investments, retirement accounts" },
                    { id: "total_asset_value", question: "Approximate total value of marital assets", type: "text", placeholder: "$0" },
                    { id: "major_debts", question: "List major debts", type: "textarea", placeholder: "Mortgage, loans, credit cards" },
                    { id: "disputed_assets", question: "Are there any assets in dispute or hidden assets suspected?", type: "textarea", placeholder: "If applicable" },
                    { id: "separate_property", question: "Is there any separate/pre-marital property to protect?", type: "textarea", placeholder: "Pre-marital assets" },
                ],
            },
            {
                title: "Custody & Support",
                questions: [
                    { id: "custody_desired", question: "What custody arrangement is desired?", type: "select", options: ["Sole Custody", "Joint Custody", "Primary with Visitation", "Specific Schedule", "Not Applicable"] },
                    { id: "current_custody", question: "What is the current custody/visitation arrangement?", type: "textarea", placeholder: "Current situation" },
                    { id: "parent_concerns", question: "Are there any concerns about the other parent?", type: "multiselect", options: ["None", "Safety Concerns", "Substance Abuse", "Neglect", "Domestic Violence", "Mental Health"] },
                    { id: "child_support_current", question: "Is child support currently being paid?", type: "textarea", placeholder: "Amount, by whom" },
                    { id: "child_support_desired", question: "What child support arrangement is desired?", type: "textarea", placeholder: "Desired arrangement" },
                    { id: "special_needs", question: "Are there any special needs or considerations for the children?", type: "textarea", placeholder: "Special circumstances" },
                ],
            },
            {
                title: "Spousal Support",
                questions: [
                    { id: "spousal_support_sought", question: "Is spousal support being sought or expected?", type: "select", options: ["Yes - Seeking", "Yes - Expected to Pay", "No", "To Be Determined"] },
                    { id: "spousal_support_desired", question: "What is the desired spousal support arrangement?", type: "textarea", placeholder: "Amount, duration" },
                    { id: "marriage_length", question: "What is the length of the marriage?", type: "text", placeholder: "Years" },
                    { id: "earning_capacity_factors", question: "Are there any factors affecting earning capacity?", type: "textarea", placeholder: "Health, education, career sacrifice" },
                ],
            },
            {
                title: "Estate Planning - Beneficiaries",
                questions: [
                    { id: "beneficiaries", question: "List intended beneficiaries", type: "textarea", placeholder: "Name, relationship, contact info" },
                    { id: "special_needs_beneficiary", question: "Are there any beneficiaries with special needs?", type: "select", options: ["Yes", "No"] },
                    { id: "exclude_beneficiaries", question: "Are there any beneficiaries to specifically exclude?", type: "textarea", placeholder: "If applicable, and reason" },
                    { id: "beneficiary_concerns", question: "Are there any concerns about a beneficiary's ability to manage inheritance?", type: "textarea", placeholder: "Age, addiction, financial irresponsibility" },
                ],
            },
            {
                title: "Estate Planning - Assets",
                questions: [
                    { id: "real_estate", question: "List real estate owned", type: "textarea", placeholder: "Address, approximate value, how titled" },
                    { id: "bank_accounts", question: "List bank accounts", type: "textarea", placeholder: "Institution, type, approximate balance" },
                    { id: "investment_accounts", question: "List investment accounts", type: "textarea", placeholder: "Institution, type, approximate value" },
                    { id: "retirement_accounts", question: "List retirement accounts", type: "textarea", placeholder: "401k, IRA, pension - institution, value, beneficiary" },
                    { id: "life_insurance", question: "List life insurance policies", type: "textarea", placeholder: "Company, face value, current beneficiary" },
                    { id: "business_interests_estate", question: "List business interests", type: "textarea", placeholder: "Name, type, ownership %, approximate value" },
                    { id: "total_estate_value", question: "Approximate total estate value", type: "text", placeholder: "$0" },
                ],
            },
            {
                title: "Estate Planning Goals",
                questions: [
                    { id: "estate_goals", question: "What are the primary goals for this estate plan?", type: "multiselect", options: ["Provide for Family", "Minimize Taxes", "Protect Assets", "Charitable Giving", "Business Succession", "Avoid Probate"] },
                    { id: "distribution_plan", question: "How should assets be distributed?", type: "textarea", placeholder: "Equally among children, specific bequests, etc." },
                    { id: "specific_bequests", question: "Are there any specific items to leave to specific people?", type: "textarea", placeholder: "Specific gifts" },
                    { id: "charitable_intentions", question: "Are there any charitable intentions?", type: "textarea", placeholder: "Charities to benefit" },
                    { id: "asset_protection_concern", question: "Is asset protection a concern?", type: "multiselect", options: ["From Creditors", "From Lawsuits", "From Divorce", "Not a Concern"] },
                ],
            },
            {
                title: "Fiduciary Appointments",
                questions: [
                    { id: "executor", question: "Who should be the executor/personal representative?", type: "text", placeholder: "Name, contact, relationship" },
                    { id: "alternate_executor", question: "Who should be the alternate executor?", type: "text", placeholder: "Name, contact, relationship" },
                    { id: "trustee", question: "Who should be the trustee (if trust is created)?", type: "text", placeholder: "Name, contact, relationship" },
                    { id: "poa_financial", question: "Who should have Power of Attorney for financial matters?", type: "text", placeholder: "Name, contact, relationship" },
                    { id: "poa_healthcare", question: "Who should have Healthcare Power of Attorney?", type: "text", placeholder: "Name, contact, relationship" },
                    { id: "guardian_minors", question: "Who should be guardian of minor children (if applicable)?", type: "text", placeholder: "Name, contact, relationship" },
                ],
            },
            {
                title: "Healthcare Directives",
                questions: [
                    { id: "living_will", question: "Does the client want a Living Will/Advance Directive?", type: "select", options: ["Yes", "No", "Unsure"] },
                    { id: "life_sustaining", question: "What are the client's wishes regarding life-sustaining treatment?", type: "textarea", placeholder: "Preferences" },
                    { id: "pain_management", question: "What are the client's wishes regarding pain management?", type: "textarea", placeholder: "Preferences" },
                    { id: "religious_beliefs", question: "Are there any religious or personal beliefs affecting healthcare decisions?", type: "textarea", placeholder: "If applicable" },
                    { id: "organ_donor", question: "Does the client wish to be an organ donor?", type: "select", options: ["Yes", "No", "Already Registered", "Undecided"] },
                ],
            },
            {
                title: "Existing Documents",
                questions: [
                    { id: "existing_will", question: "Does the client have an existing will?", type: "select", options: ["Yes", "No"] },
                    { id: "existing_trusts", question: "Does the client have existing trusts?", type: "select", options: ["Yes", "No"] },
                    { id: "existing_poa", question: "Does the client have existing powers of attorney?", type: "select", options: ["Yes", "No"] },
                    { id: "existing_healthcare_directive", question: "Does the client have an existing healthcare directive?", type: "select", options: ["Yes", "No"] },
                    { id: "last_updated", question: "When were these documents last updated?", type: "text", placeholder: "Date or approximate time" },
                ],
            },
            {
                title: "Billing & Engagement",
                questions: [
                    { id: "fee_structure", question: "How will fees be paid?", type: "select", options: ["Retainer", "Hourly", "Flat Fee", "Payment Plan", "To Be Discussed"] },
                    { id: "budget_concern", question: "Is there a budget or cost concern?", type: "textarea", placeholder: "Budget constraints" },
                    { id: "payment_responsible", question: "Who is responsible for payment?", type: "select", options: ["Client", "Family Member", "Company", "Other"] },
                ],
            },
            {
                title: "Additional Information",
                questions: [
                    { id: "additional_info", question: "Is there anything else the attorney should know?", type: "textarea", placeholder: "Any other relevant information" },
                    { id: "time_sensitive", question: "Are there any time-sensitive concerns?", type: "textarea", placeholder: "Urgent matters" },
                    { id: "consultation_time", question: "What is the best time to schedule a consultation?", type: "text", placeholder: "Preferred days/times" },
                    { id: "communication_preferences", question: "Are there any communication preferences or restrictions?", type: "textarea", placeholder: "Contact restrictions" },
                ],
            },
        ],
    },
    custom: {
        name: "Custom",
        icon: "setting",
        sections: [
            {
                title: "Project Overview",
                questions: [
                    { id: "project_name", question: "What is the name of your project?", type: "text", placeholder: "e.g. Website Redesign, New Product Launch" },
                    { id: "project_type", question: "What type of project is this?", type: "text", placeholder: "Describe the nature of your project" },
                    { id: "client_name", question: "Who is the client or stakeholder?", type: "text", placeholder: "Client or company name" },
                    { id: "project_description", question: "Describe your project in detail", type: "textarea", placeholder: "Provide a comprehensive overview of what you're trying to accomplish" },
                ],
            },
            {
                title: "Goals & Objectives",
                questions: [
                    { id: "primary_goal", question: "What is the primary goal of this project?", type: "textarea", placeholder: "The main objective you want to achieve" },
                    { id: "secondary_goals", question: "Are there any secondary goals?", type: "textarea", placeholder: "Additional objectives" },
                    { id: "success_metrics", question: "How will you measure success?", type: "textarea", placeholder: "KPIs, metrics, or outcomes that define success" },
                    { id: "constraints", question: "Are there any constraints or limitations?", type: "textarea", placeholder: "Budget, time, resources, technical limitations" },
                ],
            },
            {
                title: "Target Audience",
                questions: [
                    { id: "target_audience", question: "Who is the target audience?", type: "textarea", placeholder: "Describe who this project is for" },
                    { id: "audience_needs", question: "What are their needs or pain points?", type: "textarea", placeholder: "Problems you're solving for them" },
                    { id: "audience_expectations", question: "What do they expect from this project?", type: "textarea", placeholder: "Desired outcomes from their perspective" },
                ],
            },
            {
                title: "Scope & Deliverables",
                questions: [
                    { id: "scope", question: "What is included in the scope?", type: "textarea", placeholder: "List all items, features, or work included" },
                    { id: "out_of_scope", question: "What is explicitly out of scope?", type: "textarea", placeholder: "Items or work not included" },
                    { id: "deliverables", question: "What are the expected deliverables?", type: "textarea", placeholder: "Final outputs, documents, or products" },
                    { id: "milestones", question: "Are there any key milestones?", type: "textarea", placeholder: "Important checkpoints or phases" },
                ],
            },
            {
                title: "Timeline & Budget",
                questions: [
                    { id: "start_date", question: "When should this project start?", type: "date" },
                    { id: "end_date", question: "When is the target completion date?", type: "date" },
                    { id: "budget", question: "What is the budget for this project?", type: "text", placeholder: "$0" },
                    { id: "budget_flexibility", question: "Is there flexibility in the budget?", type: "select", options: ["Fixed Budget", "Some Flexibility", "Flexible", "To Be Determined"] },
                ],
            },
            {
                title: "Team & Communication",
                questions: [
                    { id: "team_members", question: "Who are the key team members or stakeholders?", type: "textarea", placeholder: "Names and roles" },
                    { id: "decision_maker", question: "Who is the final decision maker?", type: "text", placeholder: "Name and title" },
                    { id: "communication_preference", question: "How should updates be communicated?", type: "select", options: ["Email", "Slack/Teams", "Weekly Meetings", "Project Management Tool", "Other"] },
                    { id: "meeting_frequency", question: "How often should we meet or check in?", type: "select", options: ["Daily", "Weekly", "Bi-Weekly", "Monthly", "As Needed"] },
                ],
            },
            {
                title: "Additional Details",
                questions: [
                    { id: "references", question: "Are there any references or examples to follow?", type: "textarea", placeholder: "Links, documents, or descriptions of similar work" },
                    { id: "risks", question: "What risks or challenges do you foresee?", type: "textarea", placeholder: "Potential obstacles" },
                    { id: "additional_info", question: "Is there anything else we should know?", type: "textarea", placeholder: "Any other relevant information" },
                ],
            },
        ],
    },
};

export default function IndustryQuestionnairePage() {
    const params = useParams();
    const router = useRouter();
    const industryId = params.industry as string;
    const industry = industryData[industryId];

    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [isGenerating, setIsGenerating] = useState(false);

    if (!industry) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20">
                <h1 className="text-h2 mb-4">Industry not found</h1>
                <p className="text-body text-t-secondary mb-8">
                    The industry you're looking for doesn't exist.
                </p>
                <Button as="link" href="/dashboard/new" isSecondary>
                    Back to industries
                </Button>
            </div>
        );
    }

    const sections = industry.sections;
    const currentSectionData = sections[currentSection];
    const totalSections = sections.length;
    const progress = ((currentSection + 1) / totalSections) * 100;

    const handleAnswer = (questionId: string, value: string | string[]) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentSection < totalSections - 1) {
            setCurrentSection(currentSection + 1);
        } else {
            handleGenerate();
        }
    };

    const handleBack = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        const supabase = createClient();

        try {
            // Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                console.error("Auth error:", userError);
                alert("Please log in to create a brief");
                router.push("/login");
                return;
            }

            // Create brief record
            const briefTitle = (answers["project_name"] as string) || 
                               (answers["project_title"] as string) || 
                               `${industry.name} Brief`;
            
            const clientName = (answers["client"] as string) || 
                               (answers["company_info"] as string) || 
                               "";

            const { data: brief, error: briefError } = await supabase
                .from("briefs")
                .insert({
                    user_id: user.id,
                    title: briefTitle,
                    industry_id: industryId,
                    client_name: clientName,
                    status: "generating",
                    is_custom: false,
                })
                .select()
                .single();

            if (briefError || !brief) {
                console.error("Error creating brief:", briefError);
                alert("Failed to create brief: " + (briefError?.message || "Unknown error"));
                setIsGenerating(false);
                return;
            }

            // Save all answers
            const answersToInsert = [];
            for (const section of sections) {
                for (const question of section.questions) {
                    const answer = answers[question.id];
                    if (answer !== undefined && answer !== "") {
                        answersToInsert.push({
                            brief_id: brief.id,
                            question_id: question.id,
                            question_text: question.question,
                            answer_text: typeof answer === "string" ? answer : null,
                            answer_array: Array.isArray(answer) ? answer : null,
                            section_title: section.title,
                        });
                    }
                }
            }

            if (answersToInsert.length > 0) {
                const { error: answersError } = await supabase.from("brief_answers").insert(answersToInsert);
                if (answersError) {
                    console.error("Error saving answers:", answersError);
                }
            }

            // Increment usage (don't block on this)
            try {
                await supabase.rpc("increment_brief_usage", { p_user_id: user.id });
            } catch (e) {
                console.error("Failed to increment usage:", e);
            }

            // Navigate to generating page with brief ID
            router.push(`/dashboard/new/${industryId}/generating?briefId=${brief.id}`);
        } catch (error: any) {
            console.error("Error:", error);
            alert("An error occurred: " + (error?.message || "Unknown error"));
            setIsGenerating(false);
        }
    };

    const toggleMultiSelect = (questionId: string, option: string) => {
        const current = (answers[questionId] as string[]) || [];
        const updated = current.includes(option)
            ? current.filter((o) => o !== option)
            : [...current, option];
        handleAnswer(questionId, updated);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push("/dashboard/new")}
                    className="flex items-center gap-2 text-small text-t-secondary hover:text-t-primary mb-4"
                >
                    <ArrowLeft2 size={16} color="#8E8E93" />
                    Back to industries
                </button>
                <div className="flex items-center gap-3 mb-2">
                    {(() => {
                        const IndustryIcon = industryIcons[industryId] || Magicpen;
                        return <IndustryIcon size={24} variant="Bold" color="#2d68ff" />;
                    })()}
                    <h1 className="text-h3">{industry.name} Brief</h1>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-small text-t-secondary">
                        Section {currentSection + 1} of {totalSections}: {currentSectionData.title}
                    </span>
                    <span className="text-small text-t-tertiary">
                        {Math.round(progress)}% complete
                    </span>
                </div>
                <div className="h-2 bg-b-surface2 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary1 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Questions */}
            <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover mb-6">
                <h2 className="text-h4 mb-6">{currentSectionData.title}</h2>
                <div className="flex flex-col gap-6">
                    {currentSectionData.questions.map((q) => (
                        <div key={q.id}>
                            <label className="block mb-2 text-body-bold">
                                {q.question}
                            </label>
                            {q.type === "text" && (
                                <Field
                                    value={(answers[q.id] as string) || ""}
                                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                                    placeholder={q.placeholder}
                                    isLarge
                                />
                            )}
                            {q.type === "textarea" && (
                                <Field
                                    value={(answers[q.id] as string) || ""}
                                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                                    placeholder={q.placeholder}
                                    isLarge
                                    isTextarea
                                />
                            )}
                            {q.type === "select" && q.options && (
                                <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
                                    {q.options.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleAnswer(q.id, option)}
                                            className={`p-3 rounded-xl border-2 text-left text-small transition-all ${
                                                answers[q.id] === option
                                                    ? "border-primary1 bg-primary1/5"
                                                    : "border-stroke-subtle hover:border-stroke2"
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {q.type === "multiselect" && q.options && (
                                <div className="flex flex-wrap gap-2">
                                    {q.options.map((option) => {
                                        const selected = ((answers[q.id] as string[]) || []).includes(option);
                                        return (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => toggleMultiSelect(q.id, option)}
                                                className={`px-4 py-2 rounded-full border-2 text-small transition-all ${
                                                    selected
                                                        ? "border-primary1 bg-primary1/5 text-primary1"
                                                        : "border-stroke-subtle hover:border-stroke2"
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {q.type === "date" && (
                                <DatePicker
                                    selected={answers[q.id] ? new Date(answers[q.id] as string) : null}
                                    onChange={(date) => handleAnswer(q.id, date ? date.toISOString().split('T')[0] : "")}
                                    placeholder="Select a date"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
                {currentSection > 0 && (
                    <Button className="flex-1" isStroke onClick={handleBack}>
                        Previous
                    </Button>
                )}
                <Button
                    className="flex-1"
                    isSecondary
                    onClick={handleNext}
                    disabled={isGenerating}
                >
                    {isGenerating
                        ? "Preparing..."
                        : currentSection === totalSections - 1
                        ? "Generate Brief"
                        : "Continue"}
                </Button>
            </div>
        </div>
    );
}
