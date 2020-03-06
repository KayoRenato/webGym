--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: instructors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.instructors (
    id integer NOT NULL,
    avatar_url text,
    name text,
    birth timestamp without time zone,
    gender text,
    create_at timestamp without time zone,
    services text[]
);


--
-- Name: instructors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.instructors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: instructors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.instructors_id_seq OWNED BY public.instructors.id;


--
-- Name: members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.members (
    id integer NOT NULL,
    avatar_url text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    birth timestamp without time zone NOT NULL,
    gender text NOT NULL,
    blood text NOT NULL,
    height integer NOT NULL,
    weight integer NOT NULL,
    services text[] NOT NULL,
    create_at timestamp without time zone NOT NULL,
    instructor_id integer
);


--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- Name: instructors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructors ALTER COLUMN id SET DEFAULT nextval('public.instructors_id_seq'::regclass);


--
-- Name: members id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- Data for Name: instructors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.instructors (id, avatar_url, name, birth, gender, create_at, services) FROM stdin;
17	https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Matheus Henrique	1998-09-21 00:00:00	M	2020-02-12 00:00:00	{Natação,Musculação,Funcional}
18	https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=683&q=80	Natalia Renata	2001-03-02 00:00:00	F	2020-02-13 00:00:00	{CrossFit,Musculação,Funcional}
27	https://images.unsplash.com/photo-1543975200-8e313fb04fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Rogerio	1990-02-08 00:00:00	M	2020-02-15 00:00:00	{CrossFit,Musculação,Funcional,Natação}
28	https://images.unsplash.com/photo-1543975200-8e313fb04fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Eduardo	2002-09-12 00:00:00	M	2020-02-15 00:00:00	{Natação,Musculação,Funcional}
14	https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80	Kayo Renato	1987-11-08 00:00:00	M	2020-02-12 00:00:00	{CrossFit,Musculação,Funcional}
25	https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80	Sofia Estefane	2005-07-13 00:00:00	F	2020-02-13 00:00:00	{Pilates,Funcional,Balé}
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.members (id, avatar_url, name, email, birth, gender, blood, height, weight, services, create_at, instructor_id) FROM stdin;
12	https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=683&q=80	Maria	maria@gmail.com	1983-08-05 00:00:00	F	B-	164	54	{CrossFit,Musculação,Funcional}	2020-02-15 00:00:00	27
13	https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=683&q=80	Zuleide	zuleide@gmail.com	1995-05-22 00:00:00	F	AB-	157	51	{Natação,Musculação,Funcional}	2020-02-15 00:00:00	27
3	https://images.unsplash.com/photo-1548932813-88dcf75599c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Marcos Jordan	marcos@gmail.com	1992-06-24 00:00:00	M	AB+	190	78	{Funcional,Musculação,Natacão}	2020-02-13 00:00:00	17
4	https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=683&q=80	Joana	joana@gmail.com	1988-05-23 00:00:00	F	AB-	170	65	{CrossFit,Musculação,Funcional,Natação}	2020-02-14 00:00:00	18
6	https://images.unsplash.com/photo-1543975200-8e313fb04fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Guilherme	guilherme@gmail.com	2009-10-04 00:00:00	M	O+	162	55	{CrossFit,Musculação}	2020-02-14 00:00:00	25
8	https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Henrique	henrique@hotmail.com	1992-04-27 00:00:00	M	A+	167	76	{CrossFit,Musculação}	2020-02-14 00:00:00	17
7	https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Felipe	felipe@hotmail.com	1992-04-27 00:00:00	M	A+	167	76	{CrossFit,Musculação}	2020-02-14 00:00:00	28
2	https://images.unsplash.com/photo-1536141442894-ed5987d76d05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Kassio Ramos	kassioramos@gmail.com	1991-02-02 00:00:00	M	AB+	180	100	{CrossFit,Musculação,Box}	2020-02-13 00:00:00	14
9	https://images.unsplash.com/photo-1543975200-8e313fb04fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Luiza	luiza@gmail.com	1999-02-03 00:00:00	F	AB+	170	54	{Pilates,Funcional}	2020-02-15 00:00:00	27
11	https://images.unsplash.com/photo-1548932813-88dcf75599c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80	Eduarda	eduarda@gmail.com	2001-02-11 00:00:00	F	A-	145	62	{CrossFit,Musculação}	2020-02-15 00:00:00	14
\.


--
-- Name: instructors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.instructors_id_seq', 28, true);


--
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.members_id_seq', 13, true);


--
-- Name: instructors instructors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructors
    ADD CONSTRAINT instructors_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

