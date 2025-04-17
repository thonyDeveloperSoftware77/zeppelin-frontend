-- Table: public.course_content

-- DROP TABLE IF EXISTS public.course_content;

CREATE TABLE IF NOT EXISTS public.course_content
(
    course_content_id integer NOT NULL DEFAULT nextval('course_content_course_content_id_seq'::regclass),
    course_id integer NOT NULL,
    module character varying(100) COLLATE pg_catalog."default" NOT NULL,
    content_type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    content_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    section_index integer NOT NULL,
    module_index integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT course_content_pkey PRIMARY KEY (course_content_id),
    CONSTRAINT course_content_course_id_fkey FOREIGN KEY (course_id)
        REFERENCES public.course (course_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT course_content_content_type_check CHECK (content_type::text = ANY (ARRAY['text'::character varying, 'video'::character varying, 'quiz'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.course_content
    OWNER to postgres;

-- Trigger: set_module_index_trigger

-- DROP TRIGGER IF EXISTS set_module_index_trigger ON public.course_content;

CREATE OR REPLACE TRIGGER set_module_index_trigger
    AFTER INSERT
    ON public.course_content
    FOR EACH ROW
    EXECUTE FUNCTION public.set_module_index();

-- Trigger: trg_set_course_content_defaults

-- DROP TRIGGER IF EXISTS trg_set_course_content_defaults ON public.course_content;

CREATE OR REPLACE TRIGGER trg_set_course_content_defaults
    BEFORE INSERT
    ON public.course_content
    FOR EACH ROW
    EXECUTE FUNCTION public.set_course_content_defaults();

-- Trigger: trg_set_module_index

-- DROP TRIGGER IF EXISTS trg_set_module_index ON public.course_content;

CREATE OR REPLACE TRIGGER trg_set_module_index
    BEFORE INSERT
    ON public.course_content
    FOR EACH ROW
    EXECUTE FUNCTION public.set_module_index();


-- Table: public.course

-- DROP TABLE IF EXISTS public.course;

CREATE TABLE IF NOT EXISTS public.course
(
    course_id integer NOT NULL DEFAULT nextval('course_course_id_seq'::regclass),
    teacher_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    start_date date NOT NULL,
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    qr_code character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT course_pkey PRIMARY KEY (course_id),
    CONSTRAINT course_qr_code_key UNIQUE (qr_code),
    CONSTRAINT course_teacher_id_fkey FOREIGN KEY (teacher_id)
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.course
    OWNER to postgres;


-- Table: public.quiz

-- DROP TABLE IF EXISTS public.quiz;

CREATE TABLE IF NOT EXISTS public.quiz
(
    quiz_id integer NOT NULL DEFAULT nextval('quiz_quiz_id_seq'::regclass),
    content_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    title character varying(100) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    json_content jsonb,
    CONSTRAINT quiz_pkey PRIMARY KEY (quiz_id),
    CONSTRAINT quiz_content_id_key UNIQUE (content_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.quiz
    OWNER to postgres;


-- Table: public.text

-- DROP TABLE IF EXISTS public.text;

CREATE TABLE IF NOT EXISTS public.text
(
    content_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    json_content jsonb,
    url text COLLATE pg_catalog."default",
    title character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT text_content_pkey PRIMARY KEY (content_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.text
    OWNER to postgres;


-- Table: public.video

-- DROP TABLE IF EXISTS public.video;

CREATE TABLE IF NOT EXISTS public.video
(
    content_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    title character varying(100) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT video_pkey PRIMARY KEY (content_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.video
    OWNER to postgres;