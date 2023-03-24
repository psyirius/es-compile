import esd, { ESDCoreStatus } from '@esdebug/esdebugger-core';

const _interface = esd.getInterface();

interface CompileResult {
    code: number,
    output?: string,
    error?: string,
}

export function compile(source: string): CompileResult {
    let $ = _interface.esdInitialize('', process.pid);
    if ($.status !== ESDCoreStatus.SUCCESS) return { code: $.status };

    {
        $ = _interface.esdCompileToJSXBin(source, '', '');
    }
    _interface.esdCleanup();

    return {
        code: $.status,
        output: $.output,
        error: $.error,
    }
}