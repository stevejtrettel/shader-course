return {
  ['shader-demo'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    local height = pandoc.utils.stringify(kwargs["height"] or "500px")
    local caption = pandoc.utils.stringify(kwargs["caption"] or "")
    
    local base_path = "/demos/" .. name
    local project_dir = quarto.project.directory or "."
    
    local function file_exists(path)
      local f = io.open(path, "r")
      if f then
        f:close()
        return true
      end
      return false
    end
    
    local embed_file = project_dir .. "/demos/" .. name .. "/embed.js"
    local screenshot_file = project_dir .. "/demos/" .. name .. "/screenshot.png"
    
    if quarto.doc.is_format("html") then
      if not file_exists(embed_file) then
        return pandoc.RawBlock("html", string.format([[
<div class="callout callout-warning">
  <div class="callout-header">Missing Demo</div>
  <div class="callout-body">Shader demo <code>%s</code> not found.</div>
</div>
]], name))
      end
      
      local id = "demo-" .. name:gsub("[^%w]", "-")
      
      return pandoc.RawBlock("html", string.format([[
<figure class="shader-demo">
  <div id="%s" style="width: 100%%; height: %s;"></div>
  <script type="module">
    import { embed } from '%s/embed.js';
    await embed({ container: '#%s' });
  </script>
  %s
</figure>
]], id, height, base_path, id, 
        caption ~= "" and string.format("<figcaption>%s</figcaption>", caption) or ""))
    else
      if not file_exists(screenshot_file) then
        return pandoc.RawBlock("latex", string.format([[
\begin{tcolorbox}[colback=yellow!10, colframe=yellow!50!black, title=Missing Demo]
Shader demo \texttt{%s} not found.
\end{tcolorbox}
]], name))
      end
      
      local img = pandoc.Image(
        {pandoc.Str(caption)},
        base_path .. "/screenshot.png",
        caption
      )
      img.attributes.width = "75%"
      
      return pandoc.Blocks({
        pandoc.RawBlock("latex", "\\begin{center}"),
        pandoc.Para({img}),
        pandoc.RawBlock("latex", "\\end{center}")
      })
    end
  end
}