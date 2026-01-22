return {
  ['shader-slide'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    local base_path = "/demos/" .. name
    local id = "slide-" .. name:gsub("[^%w]", "-")

    -- Fullscreen shader for reveal.js slides
    return pandoc.RawBlock("html", string.format([[
<div id="%s" style="position: absolute; top: 0; left: 0; width: 100%%; height: 100%%; z-index: 1;"></div>
<script type="module">
  import { embed } from '%s/embed.js';
  await embed({ container: '#%s', layout: 'fullscreen' });
</script>
]], id, base_path, id))
  end
}
