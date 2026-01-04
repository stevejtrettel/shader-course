return {
  ['shader-slide'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    local base_path = "/demos/" .. name
    local id = "slide-" .. name:gsub("[^%w]", "-")

    -- Large shader for reveal.js slides with tabbed code view
    -- Uses normal flow (not absolute) so it doesn't overlay other content
    return pandoc.RawBlock("html", string.format([[
<div id="%s" class="shader-slide" style="width: 100%%; height: 85vh;"></div>
<script type="module">
  import { embed } from '%s/embed.js';
  await embed({ container: '#%s', layout: 'tabbed' });
</script>
]], id, base_path, id))
  end
}
