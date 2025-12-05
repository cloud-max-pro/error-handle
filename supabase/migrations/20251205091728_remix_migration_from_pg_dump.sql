CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: channels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.channels (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    avatar_url text,
    banner_url text,
    subscriber_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    anime_id text NOT NULL,
    user_name text NOT NULL,
    comment_text text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: pub_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pub_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    video_id uuid NOT NULL,
    user_name text NOT NULL,
    comment_text text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: pub_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pub_likes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    video_id uuid NOT NULL,
    user_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: pub_subscriptions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pub_subscriptions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    channel_id uuid NOT NULL,
    user_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: pub_videos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pub_videos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    channel_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    video_url text NOT NULL,
    thumbnail_url text,
    views integer DEFAULT 0,
    likes_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: pub_comments pub_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_comments
    ADD CONSTRAINT pub_comments_pkey PRIMARY KEY (id);


--
-- Name: pub_likes pub_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_likes
    ADD CONSTRAINT pub_likes_pkey PRIMARY KEY (id);


--
-- Name: pub_likes pub_likes_video_id_user_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_likes
    ADD CONSTRAINT pub_likes_video_id_user_name_key UNIQUE (video_id, user_name);


--
-- Name: pub_subscriptions pub_subscriptions_channel_id_user_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_subscriptions
    ADD CONSTRAINT pub_subscriptions_channel_id_user_name_key UNIQUE (channel_id, user_name);


--
-- Name: pub_subscriptions pub_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_subscriptions
    ADD CONSTRAINT pub_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: pub_videos pub_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_videos
    ADD CONSTRAINT pub_videos_pkey PRIMARY KEY (id);


--
-- Name: idx_comments_anime_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_comments_anime_id ON public.comments USING btree (anime_id);


--
-- Name: idx_comments_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_comments_created_at ON public.comments USING btree (created_at DESC);


--
-- Name: channels update_channels_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON public.channels FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: comments update_comments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: pub_comments update_pub_comments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_pub_comments_updated_at BEFORE UPDATE ON public.pub_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: pub_videos update_pub_videos_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_pub_videos_updated_at BEFORE UPDATE ON public.pub_videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: pub_comments pub_comments_video_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_comments
    ADD CONSTRAINT pub_comments_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.pub_videos(id) ON DELETE CASCADE;


--
-- Name: pub_likes pub_likes_video_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_likes
    ADD CONSTRAINT pub_likes_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.pub_videos(id) ON DELETE CASCADE;


--
-- Name: pub_subscriptions pub_subscriptions_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_subscriptions
    ADD CONSTRAINT pub_subscriptions_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: pub_videos pub_videos_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pub_videos
    ADD CONSTRAINT pub_videos_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: pub_comments Anyone can comment; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can comment" ON public.pub_comments FOR INSERT WITH CHECK (true);


--
-- Name: channels Anyone can create channels; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create channels" ON public.channels FOR INSERT WITH CHECK (true);


--
-- Name: comments Anyone can create comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create comments" ON public.comments FOR INSERT WITH CHECK (true);


--
-- Name: pub_likes Anyone can like videos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can like videos" ON public.pub_likes FOR INSERT WITH CHECK (true);


--
-- Name: pub_likes Anyone can remove likes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can remove likes" ON public.pub_likes FOR DELETE USING (true);


--
-- Name: pub_subscriptions Anyone can subscribe; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can subscribe" ON public.pub_subscriptions FOR INSERT WITH CHECK (true);


--
-- Name: pub_subscriptions Anyone can unsubscribe; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can unsubscribe" ON public.pub_subscriptions FOR DELETE USING (true);


--
-- Name: channels Anyone can update channels; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update channels" ON public.channels FOR UPDATE USING (true);


--
-- Name: pub_videos Anyone can update videos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update videos" ON public.pub_videos FOR UPDATE USING (true);


--
-- Name: pub_videos Anyone can upload videos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can upload videos" ON public.pub_videos FOR INSERT WITH CHECK (true);


--
-- Name: channels Anyone can view channels; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view channels" ON public.channels FOR SELECT USING (true);


--
-- Name: comments Anyone can view comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view comments" ON public.comments FOR SELECT USING (true);


--
-- Name: pub_comments Anyone can view comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view comments" ON public.pub_comments FOR SELECT USING (true);


--
-- Name: pub_likes Anyone can view likes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view likes" ON public.pub_likes FOR SELECT USING (true);


--
-- Name: pub_subscriptions Anyone can view subscriptions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view subscriptions" ON public.pub_subscriptions FOR SELECT USING (true);


--
-- Name: pub_videos Anyone can view videos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view videos" ON public.pub_videos FOR SELECT USING (true);


--
-- Name: channels; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;

--
-- Name: comments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

--
-- Name: pub_comments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pub_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: pub_likes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pub_likes ENABLE ROW LEVEL SECURITY;

--
-- Name: pub_subscriptions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pub_subscriptions ENABLE ROW LEVEL SECURITY;

--
-- Name: pub_videos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pub_videos ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


