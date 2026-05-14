CREATE OR REPLACE FUNCTION public.update_site_content(p_password text, p_content jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_password IS NULL OR p_password <> 'dtiba2025' THEN
    RAISE EXCEPTION 'Não autorizado';
  END IF;
  UPDATE public.site_content
    SET content = p_content, updated_at = now()
    WHERE id = 1;
END;
$$;

REVOKE ALL ON FUNCTION public.update_site_content(text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_site_content(text, jsonb) TO anon, authenticated;