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
      -- No files found - return error message
      return pandoc.Para(pandoc.Inlines({
        pandoc.Strong(pandoc.Inlines({pandoc.Str("Error: ")})),
        pandoc.Str("No GLSL files found in " .. demo_path)
      }))
    end

    -- Single file case - just a code block
    if #files == 1 then
      local code_block = pandoc.CodeBlock(files[1].content, {class = "glsl"})

      if caption ~= "" then
        return pandoc.Blocks({
          code_block,
          pandoc.Para(pandoc.Inlines({pandoc.Emph(pandoc.Inlines({pandoc.Str(caption)}))}))
        })
      else
        return code_block
      end
    end

    -- Multiple files case
    if quarto.doc.is_format("html") then
      -- HTML: Create tabbed display using Quarto's panel-tabset
      local tab_content = {}

      for _, file in ipairs(files) do
        -- Tab header
        table.insert(tab_content, pandoc.Header(3, pandoc.Inlines({pandoc.Str(file.name)})))
        -- Tab content (code block)
        table.insert(tab_content, pandoc.CodeBlock(file.content, {class = "glsl"}))
      end

      -- Wrap in panel-tabset div
      local tabset = pandoc.Div(tab_content, {class = "panel-tabset"})

      if caption ~= "" then
        return pandoc.Blocks({
          tabset,
          pandoc.Para(pandoc.Inlines({pandoc.Emph(pandoc.Inlines({pandoc.Str(caption)}))}))
        })
      else
        return tabset
      end
    else
      -- PDF: Sequential code blocks with headers
      local blocks = {}

      for _, file in ipairs(files) do
        -- Add header for each buffer
        table.insert(blocks, pandoc.Header(4, pandoc.Inlines({pandoc.Str(file.name)})))
        -- Add code block
        table.insert(blocks, pandoc.CodeBlock(file.content, {class = "glsl"}))
      end

      -- Add caption if provided
      if caption ~= "" then
        table.insert(blocks, pandoc.Para(pandoc.Inlines({pandoc.Emph(pandoc.Inlines({pandoc.Str(caption)}))})))
      end

      return pandoc.Blocks(blocks)
    end
  end
}
