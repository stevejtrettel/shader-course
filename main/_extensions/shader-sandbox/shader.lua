-- Shader Sandbox shortcode for Quarto
--
-- Usage:
--   {{< shader my-effect >}}
--   {{< shader my-effect height=400px >}}
--
-- Embeds a built shader module into the page. The shader name is resolved
-- relative to the current document's directory — so in 3d/raymarching/notes.qmd,
-- {{< shader sdf-basics >}} loads dist/3d/raymarching/sdf-basics/main.js.
--
-- Shaders are compiled by the pre-render script (build-shaders.mjs).

local counter = 0

return {
  ['shader'] = function(args, kwargs, meta)
    -- Only produce output for HTML formats
    if not quarto.doc.isFormat("html") then
      return pandoc.Null()
    end

    -- Shader name is the first positional argument
    local name = pandoc.utils.stringify(args[1])
    if not name or name == "" then
      quarto.log.error("shader shortcode requires a name: {{< shader my-shader >}}")
      return pandoc.Null()
    end

    -- Optional height (default 400px)
    local height = "500px"
    if kwargs["height"] then
      height = pandoc.utils.stringify(kwargs["height"])
    end

    -- Generate unique element ID
    counter = counter + 1
    local id = "shader-" .. name .. "-" .. counter

    -- Determine the directory of the current .qmd relative to the project root.
    -- e.g. for  <project>/3d/raymarching/notes.qmd  →  "3d/raymarching/"
    local doc_dir = ""
    if quarto.doc.input_file and quarto.project and quarto.project.directory then
      local input = quarto.doc.input_file
      local proj  = quarto.project.directory
      -- ensure trailing slash on project dir
      if proj:sub(-1) ~= "/" then proj = proj .. "/" end
      -- strip project prefix to get relative dir
      local dir = input:match("(.*/)")
      if dir and dir:sub(1, #proj) == proj then
        doc_dir = dir:sub(#proj + 1)
      end
    end

    -- quarto.project.offset is the relative path from the rendered HTML
    -- back to the project root (e.g. "../../" for a two-level-deep doc).
    local offset = ""
    if quarto.project and quarto.project.offset then
      offset = quarto.project.offset
      if offset ~= "" and offset:sub(-1) ~= "/" then
        offset = offset .. "/"
      end
    end

    -- Final module path:  <offset>dist/<doc_dir><shader>/main.js
    local src = offset .. "dist/" .. doc_dir .. name .. "/main.js"

    local html = string.format([[
<div id="%s" style="width:75%%;height:%s;display:block;margin:0 auto"></div>
<script type="module">
import { mount } from './%s';
// Workaround: the shader-sandbox bundle injects base.css which sets
// html,body { overflow: hidden }. Undo that so the page scrolls.
document.documentElement.style.overflow = 'auto';
document.body.style.overflow = 'auto';
mount(document.getElementById('%s'));
</script>
]], id, height, src, id)

    return pandoc.RawBlock('html', html)
  end
}
