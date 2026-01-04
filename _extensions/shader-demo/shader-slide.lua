return {
  ['shader-slide'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    local base_path = "/demos/" .. name
    local id = "slide-" .. name:gsub("[^%w]", "-")

    -- Large shader for reveal.js slides - stays in document flow
    return pandoc.RawBlock("html", string.format([[
<div id="%s" style="width: 100%%; height: 80vh;"></div>
<script type="module">
  import { embed } from '%s/embed.js';
  await embed({ container: '#%s', layout: 'fullscreen' });
</script>
]], id, base_path, id))
  end
}
