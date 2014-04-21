;
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([""], factory)
  } else {
    root.WebConsole = factory()
  }
})(this, function () {
  function WebConsole(runner, options) {
    //TODO needs to be removed to options somehow
    var reporterQueryParameter = 'test=console'

    var stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 }
      , failures = this.failures = []
      , tests = []
      , total = runner.total
      , title = document.title
      , calls = []

    runner.stats = stats

    runner.on('pass', function (test) {
      stats.passes = stats.passes || 0

      var medium = test.slow() / 2
      test.speed = test.duration > test.slow()
        ? 'slow'
        : test.duration > medium
        ? 'medium'
        : 'fast'

      stats.passes++
    })

    runner.on('pending', function () {
      stats.pending++
    })

    runner.on('start', function () {
      stats.start = new Date
    })

    runner.on('fail', function (test, err) {
      stats.failures = stats.failures || 0
      stats.failures++
      test.err = err
      failures.push(test)
      calls.push(['info', null, test.title])
      calls.push(['error', null, test.err.stack])
      flagFailures(test.parent)
    })

    function flagFailures(node) {
      node.hasFailures = true
      if (node.parent) flagFailures(node.parent)
    }

    runner.on('suite', function (suite) {
      stats.suites = stats.suites || 0
      suite.root || stats.suites++

      var parameter = '?grep=' + encodeURIComponent(suite.fullTitle()) + '&' + reporterQueryParameter
      var location = document.location
      var url = location.origin + location.pathname + parameter
      calls.push(['group', suite, suite.title])
      calls.push(['groupCollapsed', suite , 'url'])
      calls.push(['log', suite, url])
      calls.push(['groupEnd', suite])
    })
    runner.on('suite end', function (suite) {
      calls.push(['groupEnd', suite])
    })

    runner.on('test end', function () {
      stats.tests = stats.tests || 0
      stats.tests++

      var percent = stats.tests / total * 100 | 0
      document.title = percent + '% ' + (stats.failures ? stats.failures + ' failures ' : '' ) + title
    })

    runner.on('end', function () {
      stats.end = new Date
      stats.duration = new Date - stats.start
      if (stats.errors || stats.failures) {
        for (var i in calls) {
          var call = calls[i]
          var command = call.shift()
          var suite = call.shift()
          var failures = !suite || suite.hasFailures
          if (failures || command == 'info' || command == 'error') {
            console[command].apply(console, call)
          }
        }
      }
      if (stats.errors) console.warn(stats.errors, ' errors')
      if (stats.failures) console.warn(stats.failures, ' failures')
      var skipped = stats.tests - stats.failures - stats.passes
      if (skipped) console.warn(skipped, ' skipped')
      console.log(stats.passes, ' tests passed')
      console.log(stats.duration / 1000, ' seconds')
      console.log((new Date).toUTCString())
      console.log('Run all tests ' + location.origin + location.pathname + '?' + reporterQueryParameter)
    })
  }

  return WebConsole
})
