-- Minimal shader-code extension

return {
  ['shader-code'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    return pandoc.RawBlock("html", "<pre><code>-- Placeholder for: " .. name .. "</code></pre>")
  end
}
