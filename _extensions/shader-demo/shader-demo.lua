return {
  ['shader-demo'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    local height = pandoc.utils.stringify(kwargs["height"] or "500px")
    local caption = pandoc.utils.stringify(kwargs["caption"] or "")
    
    local base_path = "/demos/" .. name
    
    if quarto.doc.is_format("html") then
      local id = "demo-" .. name:gsub("[^%w]", "-")
      
      return pandoc.RawBlock("html", string.format([[
<figure class="shader-demo">
  <div id="%s" style="width: 100%%; height: %s;"></div>
  <script type="module">
    import { embed } from '%s/embed.js';
    await embed({ container: '#%s', layout: 'tabbed' });
  </script>
  %s
</figure>
]], id, height, base_path, id, 
        caption ~= "" and string.format("<figcaption>%s</figcaption>", caption) or ""))
    else
      return pandoc.Para({
        pandoc.Image(
          {pandoc.Str(caption)},
          base_path .. "/screenshot.png",
          caption
        )
      })
    end
  end
}