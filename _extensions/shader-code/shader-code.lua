-- shader-code.lua
-- Reads GLSL files from a shader demo folder and embeds them as code blocks
-- For HTML: creates tabbed view when multiple shaders exist
-- For PDF/other: shows code blocks consecutively

local function file_exists(path)
  local f = io.open(path, "r")
  if f then
    f:close()
    return true
  end
  return false
end

local function read_file(path)
  local f = io.open(path, "r")
  if not f then return nil end
  local content = f:read("*all")
  f:close()
  return content
end

local function dir_exists(path)
  -- Try to open a file in the directory to check if it exists
  -- This is a bit hacky but works cross-platform in Lua
  local ok, err, code = os.rename(path, path)
  if not ok then
    if code == 13 then
      -- Permission denied, but it exists
      return true
    end
    return false
  end
  return true
end

local function get_shader_files(folder_path)
  local shaders = {}
  
  -- Buffer shaders first (A, B, C, ...)
  for i = 0, 25 do
    local letter = string.char(65 + i)
    local buffer_path = pandoc.path.join({folder_path, "buffer" .. letter .. ".glsl"})
    if file_exists(buffer_path) then
      table.insert(shaders, {
        name = "Buffer " .. letter,
        filename = "buffer" .. letter .. ".glsl",
        path = buffer_path
      })
    end
  end
  
  -- image.glsl last (main shader)
  local image_path = pandoc.path.join({folder_path, "image.glsl"})
  if file_exists(image_path) then
    table.insert(shaders, {
      name = "Image",
      filename = "image.glsl",
      path = image_path
    })
  end
  
  return shaders
end

return {
  ['shader-code'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    local caption = pandoc.utils.stringify(kwargs["caption"] or "")
    
    local project_dir = quarto.project.directory or pandoc.system.get_working_directory()
    local folder_path = pandoc.path.join({project_dir, "demos", name})
    
    -- Check if folder exists
    if not dir_exists(folder_path) then
      if quarto.doc.is_format("html") then
        return pandoc.RawBlock("html", string.format([[
<div class="callout callout-warning">
  <div class="callout-header">Missing Shader Code</div>
  <div class="callout-body">Shader folder <code>demos/%s</code> not found.</div>
</div>
]], name))
      else
        return pandoc.RawBlock("latex", string.format([[
\begin{tcolorbox}[colback=yellow!10, colframe=yellow!50!black, title=Missing Shader Code]
Shader folder \texttt{demos/%s} not found.
\end{tcolorbox}
]], name))
      end
    end
    
    local shaders = get_shader_files(folder_path)
    
    -- Check if any GLSL files found
    if #shaders == 0 then
      if quarto.doc.is_format("html") then
        return pandoc.RawBlock("html", string.format([[
<div class="callout callout-warning">
  <div class="callout-header">Missing Shader Code</div>
  <div class="callout-body">No GLSL files found in <code>demos/%s</code></div>
</div>
]], name))
      else
        return pandoc.RawBlock("latex", string.format([[
\begin{tcolorbox}[colback=yellow!10, colframe=yellow!50!black, title=Missing Shader Code]
No GLSL files found in \texttt{demos/%s}
\end{tcolorbox}
]], name))
      end
    end
    
    local blocks = pandoc.Blocks({})
    
    if caption ~= "" then
      blocks:insert(pandoc.Para(pandoc.Strong(caption)))
    end
    
    if quarto.doc.is_format("html") then
      if #shaders == 1 then
        local content = read_file(shaders[1].path) or "// Error reading file"
        blocks:insert(pandoc.CodeBlock(content, {class = "glsl"}))
      else
        local tabs = {}
        for _, shader in ipairs(shaders) do
          local content = read_file(shader.path) or "// Error reading file"
          table.insert(tabs, quarto.Tab({
            title = shader.name,
            content = pandoc.Blocks({pandoc.CodeBlock(content, {class = "glsl"})})
          }))
        end
        blocks:insert(quarto.Tabset({tabs = tabs, level = 3}))
      end
    else
      -- PDF/other: just consecutive code blocks, no labels
      for _, shader in ipairs(shaders) do
        local content = read_file(shader.path) or "// Error reading file"
        blocks:insert(pandoc.CodeBlock(content, {class = "glsl"}))
      end
    end
    
    return blocks
  end
}