-- shader-sandbox.lua
-- Quarto shortcode for embedding shader-sandbox elements.
--
-- Usage:
--   {{< shader breakfast-scene >}}
--   {{< shader breakfast-scene height=400px controls="false" >}}
--   {{< shader /custom/path/to/shader >}}
--
-- Bare names resolve relative to the current .qmd file's directory:
--   notes/3d/04-sculpting/notes.qmd + {{< shader breakfast-scene >}}
--   → src="/notes/3d/04-sculpting/shaders/breakfast-scene/"
--
-- The script is included automatically only on pages that use the shortcode.

local has_added_dep = false
local counter = 0

return {
  ["shader"] = function(args, kwargs)
    if not quarto.doc.isFormat("html") then
      return pandoc.Null()
    end

    -- Only add the JS dependency once per document
    if not has_added_dep then
      quarto.doc.add_html_dependency({
        name = "shader-sandbox",
        version = "0.1.0",
        scripts = {
          { path = "shader-sandbox.js", attribs = { type = "module" } }
        }
      })
      has_added_dep = true
    end

    -- First positional arg is the shader name or path
    if not args[1] then
      quarto.log.error("shader shortcode requires a name: {{< shader my-shader >}}")
      return pandoc.Null()
    end
    local name = pandoc.utils.stringify(args[1])
    if name == "" then
      quarto.log.error("shader shortcode requires a name: {{< shader my-shader >}}")
      return pandoc.Null()
    end

    -- Optional height (default 500px)
    local height = "500px"
    if kwargs["height"] then
      local h = pandoc.utils.stringify(kwargs["height"])
      if h ~= "" then height = h end
    end

    local src
    if name:match("/") then
      -- Explicit path: use as-is
      src = name
    else
      -- Bare name: resolve relative to the current .qmd's directory
      local doc_dir = ""
      if quarto.doc.input_file and quarto.project and quarto.project.directory then
        local input = quarto.doc.input_file
        local proj  = quarto.project.directory
        if proj:sub(-1) ~= "/" then proj = proj .. "/" end
        local dir = input:match("(.*/)")
        if dir and dir:sub(1, #proj) == proj then
          doc_dir = dir:sub(#proj + 1)
        end
      end
      src = "/" .. doc_dir .. "shaders/" .. name .. "/"
    end

    -- Ensure trailing slash
    if not src:match("/$") then
      src = src .. "/"
    end

    -- Collect extra attributes from kwargs (skip height, already handled)
    local extra = ""
    for k, v in pairs(kwargs) do
      if k ~= "height" then
        extra = extra .. " " .. k .. '="' .. pandoc.utils.stringify(v) .. '"'
      end
    end

    -- Build the element via JS so we can resolve the path to a full URL.
    -- The library's internal new URL(file, src) requires an absolute URL
    -- with protocol — a bare path like "/notes/..." won't work.
    counter = counter + 1
    local id = "shader-" .. name:gsub("/", "-") .. "-" .. counter
    local style = string.format("width:75%%;height:%s;display:block;margin:0 auto", height)

    local html = string.format([[
<div id="%s" style="%s"></div>
<script type="module">
const el = document.createElement('shader-sandbox');
el.setAttribute('src', new URL('%s', location.href).href);
el.style.cssText = 'width:100%%;height:%s;display:block';
%s
document.getElementById('%s').appendChild(el);
</script>
]], id, style, src, height, extra ~= "" and ("// extra attrs\n" .. string.gsub(extra, '%s(%w+)="([^"]*)"', "el.setAttribute('%1', '%2');")) or "", id)

    return pandoc.RawBlock("html", html)
  end
}
