-- Shader Code Extension
-- Embeds GLSL source code from demos/ folder
-- Single file: code block
-- Multiple files: tabs (HTML) or sequential (PDF)

-- Buffer files in Shadertoy order
local BUFFER_ORDER = {"bufferA", "bufferB", "bufferC", "bufferD", "image"}

-- Read a file and return its contents, or nil if not found
local function read_file(path)
  local file = io.open(path, "r")
  if not file then
    return nil
  end
  local content = file:read("*all")
  file:close()
  return content
end

-- Find all GLSL files in a demo folder
local function find_glsl_files(demo_path)
  local files = {}
  for _, name in ipairs(BUFFER_ORDER) do
    local path = demo_path .. "/" .. name .. ".glsl"
    local content = read_file(path)
    if content then
      table.insert(files, {name = name, content = content})
    end
  end
  return files
end

return {
  ['shader-code'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    local caption = pandoc.utils.stringify(kwargs["caption"] or "")

    -- Construct path to demo folder
    local demo_path = "demos/" .. name

    -- Find all GLSL files
    local files = find_glsl_files(demo_path)

    if #files == 0 then
      -- No files found - return error message as raw HTML/text
      if quarto.doc.is_format("html") then
        return pandoc.RawBlock("html", "<p><strong>Error:</strong> No GLSL files found in " .. demo_path .. "</p>")
      else
        return pandoc.RawBlock("latex", "\\textbf{Error:} No GLSL files found in " .. demo_path)
      end
    end

    -- Single file case - just a code block
    if #files == 1 then
      local code = files[1].content
      if caption ~= "" then
        if quarto.doc.is_format("html") then
          return pandoc.RawBlock("html", string.format([[
<figure class="shader-code">
<pre><code class="language-glsl">%s</code></pre>
<figcaption>%s</figcaption>
</figure>
]], code, caption))
        else
          return pandoc.CodeBlock(code, {class = "glsl"})
        end
      else
        return pandoc.CodeBlock(code, {class = "glsl"})
      end
    end

    -- Multiple files case
    if quarto.doc.is_format("html") then
      -- HTML: Create tabbed display
      local html = '<div class="panel-tabset">\n'

      for _, file in ipairs(files) do
        html = html .. string.format([[
### %s

```glsl
%s
```

]], file.name, file.content)
      end

      html = html .. '</div>'

      if caption ~= "" then
        html = html .. string.format('<p><em>%s</em></p>', caption)
      end

      -- Return as markdown to be processed by Quarto
      return pandoc.RawBlock("markdown", html)
    else
      -- PDF: Sequential code blocks with headers
      local latex = ""

      for _, file in ipairs(files) do
        latex = latex .. string.format("\\paragraph{%s}\n\n", file.name)
        -- Use a simple verbatim for now
      end

      -- For PDF, build blocks manually
      local blocks = {}
      for _, file in ipairs(files) do
        table.insert(blocks, pandoc.Header(4, {pandoc.Str(file.name)}))
        table.insert(blocks, pandoc.CodeBlock(file.content, {class = "glsl"}))
      end

      return blocks
    end
  end
}
