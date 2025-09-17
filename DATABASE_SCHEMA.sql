-- قاعدة بيانات منصة فرصتك للوظائف
-- Database: forsatuk_jobs
-- يمكن استخدامها مع PostgreSQL أو Supabase

-- =====================================================
-- 1. جدول المستخدمين (Users)
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('freelancer', 'employer', 'admin') NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_active ON users(is_active);

-- =====================================================
-- 2. جدول الملفات الشخصية للمستقلين (Freelancer Profiles)
-- =====================================================
CREATE TABLE freelancer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(200),
    avatar_url TEXT,
    title VARCHAR(200), -- مثل: "مطور Full Stack"
    bio TEXT,
    hourly_rate DECIMAL(10, 2),
    skills TEXT[], -- مصفوفة من المهارات
    languages JSONB, -- {"arabic": "native", "english": "fluent"}
    location VARCHAR(100),
    phone VARCHAR(20),
    portfolio_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    verification_badge BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 0.00, -- من 0 إلى 5
    total_reviews INTEGER DEFAULT 0,
    total_earnings DECIMAL(12, 2) DEFAULT 0.00,
    completed_projects INTEGER DEFAULT 0,
    profile_views INTEGER DEFAULT 0,
    response_time INTEGER, -- بالساعات
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_freelancer_user ON freelancer_profiles(user_id);
CREATE INDEX idx_freelancer_skills ON freelancer_profiles USING GIN(skills);
CREATE INDEX idx_freelancer_available ON freelancer_profiles(is_available);
CREATE INDEX idx_freelancer_rating ON freelancer_profiles(rating DESC);

-- =====================================================
-- 3. جدول الملفات الشخصية للشركات (Employer Profiles)
-- =====================================================
CREATE TABLE employer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    company_logo TEXT,
    company_size ENUM('1-10', '11-50', '51-200', '201-500', '500+'),
    industry VARCHAR(100),
    website TEXT,
    description TEXT,
    location VARCHAR(100),
    phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_documents JSONB,
    total_spent DECIMAL(12, 2) DEFAULT 0.00,
    total_projects INTEGER DEFAULT 0,
    active_projects INTEGER DEFAULT 0,
    avg_rating DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_employer_user ON employer_profiles(user_id);
CREATE INDEX idx_employer_verified ON employer_profiles(is_verified);

-- =====================================================
-- 4. جدول الفئات (Categories)
-- =====================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    parent_id UUID REFERENCES categories(id),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج الفئات الأساسية
INSERT INTO categories (name, slug, icon) VALUES
('برمجة وتطوير', 'programming', 'Code'),
('تصميم وإبداع', 'design', 'Palette'),
('كتابة ومحتوى', 'writing', 'PenTool'),
('تسويق رقمي', 'marketing', 'TrendingUp'),
('ترجمة ولغات', 'translation', 'Languages'),
('استشارات', 'consulting', 'Users'),
('دعم إداري', 'admin-support', 'Briefcase'),
('هندسة', 'engineering', 'Settings');

-- =====================================================
-- 5. جدول المشاريع/الوظائف (Jobs)
-- =====================================================
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id),
    skills_required TEXT[],
    budget_type ENUM('fixed', 'hourly') NOT NULL,
    budget_min DECIMAL(10, 2),
    budget_max DECIMAL(10, 2),
    duration VARCHAR(50), -- "أقل من شهر", "1-3 أشهر", إلخ
    experience_level ENUM('entry', 'intermediate', 'expert') NOT NULL,
    status ENUM('draft', 'open', 'in_progress', 'completed', 'cancelled') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    featured_until TIMESTAMP,
    views_count INTEGER DEFAULT 0,
    proposals_count INTEGER DEFAULT 0,
    attachments JSONB, -- [{"name": "", "url": "", "size": ""}]
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    closed_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_jobs_employer ON jobs(employer_id);
CREATE INDEX idx_jobs_category ON jobs(category_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_featured ON jobs(is_featured, featured_until);
CREATE INDEX idx_jobs_created ON jobs(created_at DESC);
CREATE INDEX idx_jobs_budget ON jobs(budget_min, budget_max);
CREATE INDEX idx_jobs_skills ON jobs USING GIN(skills_required);

-- =====================================================
-- 6. جدول العروض (Proposals)
-- =====================================================
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cover_letter TEXT NOT NULL,
    bid_amount DECIMAL(10, 2) NOT NULL,
    delivery_time INTEGER NOT NULL, -- بالأيام
    status ENUM('pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
    attachments JSONB,
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, freelancer_id) -- منع التقدم مرتين لنفس الوظيفة
);

-- Indexes
CREATE INDEX idx_proposals_job ON proposals(job_id);
CREATE INDEX idx_proposals_freelancer ON proposals(freelancer_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_created ON proposals(created_at DESC);

-- =====================================================
-- 7. جدول العقود (Contracts)
-- =====================================================
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id),
    proposal_id UUID REFERENCES proposals(id),
    employer_id UUID NOT NULL REFERENCES users(id),
    freelancer_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    contract_type ENUM('fixed', 'hourly') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    hourly_rate DECIMAL(10, 2),
    weekly_hours_limit INTEGER,
    status ENUM('pending', 'active', 'completed', 'cancelled', 'disputed') DEFAULT 'pending',
    start_date DATE,
    end_date DATE,
    actual_end_date DATE,
    escrow_amount DECIMAL(10, 2) DEFAULT 0.00,
    released_amount DECIMAL(10, 2) DEFAULT 0.00,
    platform_fee DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_contracts_job ON contracts(job_id);
CREATE INDEX idx_contracts_employer ON contracts(employer_id);
CREATE INDEX idx_contracts_freelancer ON contracts(freelancer_id);
CREATE INDEX idx_contracts_status ON contracts(status);

-- =====================================================
-- 8. جدول المعاملات المالية (Transactions)
-- =====================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    contract_id UUID REFERENCES contracts(id),
    type ENUM('deposit', 'withdrawal', 'escrow', 'release', 'refund', 'fee', 'subscription') NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50), -- 'paypal', 'stripe', 'bank_transfer'
    payment_details JSONB,
    reference_number VARCHAR(100) UNIQUE,
    description TEXT,
    fee_amount DECIMAL(10, 2) DEFAULT 0.00,
    net_amount DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_contract ON transactions(contract_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);

-- =====================================================
-- 9. جدول المحافظ (Wallets)
-- =====================================================
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(12, 2) DEFAULT 0.00,
    pending_balance DECIMAL(12, 2) DEFAULT 0.00,
    available_balance DECIMAL(12, 2) DEFAULT 0.00,
    total_earned DECIMAL(12, 2) DEFAULT 0.00,
    total_withdrawn DECIMAL(12, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_wallets_user ON wallets(user_id);

-- =====================================================
-- 10. جدول الرسائل (Messages)
-- =====================================================
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL,
    sender_id UUID NOT NULL REFERENCES users(id),
    recipient_id UUID NOT NULL REFERENCES users(id),
    job_id UUID REFERENCES jobs(id),
    contract_id UUID REFERENCES contracts(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    attachments JSONB,
    is_system_message BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_messages_unread ON messages(recipient_id, is_read) WHERE is_read = FALSE;

-- =====================================================
-- 11. جدول المحادثات (Conversations)
-- =====================================================
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant1_id UUID NOT NULL REFERENCES users(id),
    participant2_id UUID NOT NULL REFERENCES users(id),
    job_id UUID REFERENCES jobs(id),
    contract_id UUID REFERENCES contracts(id),
    last_message_id UUID REFERENCES messages(id),
    last_message_at TIMESTAMP,
    participant1_archived BOOLEAN DEFAULT FALSE,
    participant2_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(participant1_id, participant2_id)
);

-- Indexes
CREATE INDEX idx_conversations_participants ON conversations(participant1_id, participant2_id);
CREATE INDEX idx_conversations_job ON conversations(job_id);
CREATE INDEX idx_conversations_updated ON conversations(last_message_at DESC);

-- =====================================================
-- 12. جدول الإشعارات (Notifications)
-- =====================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'new_proposal', 'message', 'payment', etc
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    data JSONB, -- معلومات إضافية
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    action_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- =====================================================
-- 13. جدول التقييمات (Reviews)
-- =====================================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES contracts(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewed_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_recommended BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(contract_id, reviewer_id) -- تقييم واحد فقط لكل عقد من كل طرف
);

-- Indexes
CREATE INDEX idx_reviews_contract ON reviews(contract_id);
CREATE INDEX idx_reviews_reviewed ON reviews(reviewed_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- =====================================================
-- 14. جدول المهارات (Skills)
-- =====================================================
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category_id UUID REFERENCES categories(id),
    is_trending BOOLEAN DEFAULT FALSE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج مهارات أساسية
INSERT INTO skills (name, slug) VALUES
('JavaScript', 'javascript'),
('Python', 'python'),
('React', 'react'),
('Node.js', 'nodejs'),
('PHP', 'php'),
('WordPress', 'wordpress'),
('Photoshop', 'photoshop'),
('Illustrator', 'illustrator'),
('SEO', 'seo'),
('Content Writing', 'content-writing');

-- =====================================================
-- 15. جدول الاشتراكات (Subscriptions)
-- =====================================================
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    plan_type ENUM('free', 'basic', 'pro', 'enterprise') NOT NULL,
    status ENUM('active', 'cancelled', 'expired', 'suspended') DEFAULT 'active',
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle ENUM('monthly', 'yearly') NOT NULL,
    features JSONB, -- {"proposals": 50, "featured_profile": true, ...}
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    auto_renew BOOLEAN DEFAULT TRUE,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_end_date ON subscriptions(end_date);

-- =====================================================
-- 16. جدول حصص العروض (Proposal Credits)
-- =====================================================
CREATE TABLE proposal_credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    total_credits INTEGER DEFAULT 10, -- العدد الأساسي المجاني شهرياً
    used_credits INTEGER DEFAULT 0,
    purchased_credits INTEGER DEFAULT 0,
    reset_date DATE NOT NULL, -- تاريخ إعادة تعيين الحصة الشهرية
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_credits_user ON proposal_credits(user_id);
CREATE INDEX idx_credits_reset ON proposal_credits(reset_date);

-- =====================================================
-- 17. جدول سجل النشاطات (Activity Log)
-- =====================================================
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50), -- 'job', 'proposal', 'message', etc
    entity_id UUID,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_activity_user ON activity_logs(user_id);
CREATE INDEX idx_activity_action ON activity_logs(action);
CREATE INDEX idx_activity_created ON activity_logs(created_at DESC);

-- =====================================================
-- 18. جدول الوظائف المميزة (Featured Jobs)
-- =====================================================
CREATE TABLE featured_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    featured_type ENUM('homepage', 'category', 'search') NOT NULL,
    position INTEGER DEFAULT 1,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    amount_paid DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_featured_job ON featured_jobs(job_id);
CREATE INDEX idx_featured_active ON featured_jobs(start_date, end_date);

-- =====================================================
-- 19. جدول البلاغات (Reports)
-- =====================================================
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES users(id),
    reported_user_id UUID REFERENCES users(id),
    job_id UUID REFERENCES jobs(id),
    proposal_id UUID REFERENCES proposals(id),
    reason VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('pending', 'reviewing', 'resolved', 'dismissed') DEFAULT 'pending',
    admin_notes TEXT,
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_reports_reporter ON reports(reporter_id);
CREATE INDEX idx_reports_status ON reports(status);

-- =====================================================
-- 20. جدول إعدادات المنصة (Platform Settings)
-- =====================================================
CREATE TABLE platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج الإعدادات الأساسية
INSERT INTO platform_settings (setting_key, setting_value, description) VALUES
('platform_fee_freelancer', '{"percentage": 5, "min": 1, "max": 100}', 'عمولة المنصة من المستقل'),
('platform_fee_employer', '{"percentage": 2.5, "min": 0.5, "max": 50}', 'عمولة المنصة من صاحب العمل'),
('free_proposals_monthly', '{"count": 10}', 'عدد العروض المجانية شهرياً'),
('proposal_credit_price', '{"price": 1}', 'سعر العرض الإضافي'),
('featured_job_price', '{"homepage": 25, "category": 10, "search": 15}', 'أسعار الوظائف المميزة'),
('minimum_withdrawal', '{"amount": 10}', 'الحد الأدنى للسحب'),
('escrow_release_days', '{"days": 3}', 'أيام احتجاز المبلغ بعد إنجاز المشروع');

-- =====================================================
-- Functions & Triggers
-- =====================================================

-- Function لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- تطبيق Trigger على الجداول المناسبة
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_freelancer_profiles_updated_at BEFORE UPDATE ON freelancer_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_employer_profiles_updated_at BEFORE UPDATE ON employer_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function لحساب الرصيد المتاح
CREATE OR REPLACE FUNCTION calculate_available_balance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE wallets
    SET available_balance = balance - pending_balance
    WHERE user_id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wallet_balance AFTER UPDATE OF balance, pending_balance ON wallets
    FOR EACH ROW EXECUTE FUNCTION calculate_available_balance();

-- Function لزيادة عدد المشاهدات
CREATE OR REPLACE FUNCTION increment_views()
RETURNS TRIGGER AS $$
BEGIN
    -- هذا مجرد مثال، يمكن إضافة منطق أكثر تعقيداً
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Permissions (for Supabase RLS)
-- =====================================================

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (examples)
-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Anyone can view published jobs
CREATE POLICY "Public can view open jobs" ON jobs
    FOR SELECT USING (status = 'open');

-- Only job owner can edit
CREATE POLICY "Employers can edit own jobs" ON jobs
    FOR ALL USING (auth.uid() = employer_id);

-- =====================================================
-- Seed Data for Testing (Optional)
-- =====================================================

-- يمكن إضافة بيانات تجريبية هنا للاختبار